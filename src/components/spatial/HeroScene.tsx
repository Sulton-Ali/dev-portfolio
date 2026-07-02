import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "#/theme/ThemeProvider";

const PARTICLE_COUNT = 1400;
const PARTICLE_RADIUS_X = 6;
const PARTICLE_RADIUS_Y = 3.2;
const PARTICLE_RADIUS_Z = 4;

// Constellation lines: computed once at mount from the same particle
// positions. Threshold picked empirically against the ellipsoid field's
// density so the candidate set stays in the low thousands (cheap to sort
// once); the hard cap below is the real bound.
const CONSTELLATION_THRESHOLD = 1.1;
const CONSTELLATION_MAX_SEGMENTS = 1200;

type SceneColors = {
	accent: THREE.Color;
	accentText: THREE.Color;
	muted: THREE.Color;
};

const FALLBACK_COLORS: SceneColors = {
	accent: new THREE.Color("#7c3aed"),
	accentText: new THREE.Color("#c4b5fd"),
	muted: new THREE.Color("#a3a3be"),
};

// Reads the live Spatial theme tokens off the DOM. WebGL materials can't
// consume CSS custom properties directly, so this is the one place the
// scene bridges tokens -> THREE.Color. Re-run whenever `mode` (dark/light)
// changes so the palette stays in sync without a reload.
function readSceneColors(): SceneColors {
	if (typeof document === "undefined") return FALLBACK_COLORS;
	const el = document.documentElement.hasAttribute("data-theme")
		? document.documentElement
		: (document.querySelector("[data-theme]") ?? document.documentElement);
	const styles = getComputedStyle(el);
	const accent = styles.getPropertyValue("--accent").trim();
	const accentText = styles.getPropertyValue("--accent-text").trim();
	const muted = styles.getPropertyValue("--fg-muted").trim();
	return {
		accent: accent ? new THREE.Color(accent) : FALLBACK_COLORS.accent,
		accentText: accentText
			? new THREE.Color(accentText)
			: FALLBACK_COLORS.accentText,
		muted: muted ? new THREE.Color(muted) : FALLBACK_COLORS.muted,
	};
}

// Particle positions + per-particle mix factor are generated once and never
// change; only the two colors they're tinted between (`--fg-muted` and
// `--accent-text`) get re-derived when the mode toggles, so a light/dark
// switch re-tints the field in place instead of reshuffling the stars.
//
// Constellation lines (segments between nearby particles) are derived from
// the same positions in a second memo, so they never recompute either. Both
// the points and the lines live under one rotating group so the lines stay
// attached to their endpoints as the field spins.
function ParticleField({
	colorA,
	colorB,
	lineColor,
}: {
	colorA: THREE.Color;
	colorB: THREE.Color;
	lineColor: THREE.Color;
}) {
	const groupRef = useRef<THREE.Group>(null);

	const { positions, mixFactors } = useMemo(() => {
		const positions = new Float32Array(PARTICLE_COUNT * 3);
		const mixFactors = new Float32Array(PARTICLE_COUNT);
		for (let i = 0; i < PARTICLE_COUNT; i++) {
			// Random point inside a flat-ish ellipsoid shell around the camera view.
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(2 * Math.random() - 1);
			const r = 0.6 + Math.random() * 0.4;
			positions[i * 3] =
				PARTICLE_RADIUS_X * r * Math.sin(phi) * Math.cos(theta);
			positions[i * 3 + 1] =
				PARTICLE_RADIUS_Y * r * Math.sin(phi) * Math.sin(theta);
			positions[i * 3 + 2] = PARTICLE_RADIUS_Z * r * Math.cos(phi);
			mixFactors[i] = Math.random();
		}
		return { positions, mixFactors };
	}, []);

	const colors = useMemo(() => {
		const array = new Float32Array(PARTICLE_COUNT * 3);
		const blended = new THREE.Color();
		for (let i = 0; i < PARTICLE_COUNT; i++) {
			blended.copy(colorA).lerp(colorB, mixFactors[i] ?? 0);
			array[i * 3] = blended.r;
			array[i * 3 + 1] = blended.g;
			array[i * 3 + 2] = blended.b;
		}
		return array;
	}, [colorA, colorB, mixFactors]);

	// Bounded pairwise pass over the (fixed) particle positions: ~1400^2 / 2
	// distance checks once at mount, never per frame. Candidates within the
	// threshold are sorted nearest-first and truncated to the segment cap.
	const linePositions = useMemo(() => {
		const thresholdSq = CONSTELLATION_THRESHOLD * CONSTELLATION_THRESHOLD;
		const candidates: { a: number; b: number; distSq: number }[] = [];
		for (let i = 0; i < PARTICLE_COUNT; i++) {
			const ax = positions[i * 3] ?? 0;
			const ay = positions[i * 3 + 1] ?? 0;
			const az = positions[i * 3 + 2] ?? 0;
			for (let j = i + 1; j < PARTICLE_COUNT; j++) {
				const dx = ax - (positions[j * 3] ?? 0);
				const dy = ay - (positions[j * 3 + 1] ?? 0);
				const dz = az - (positions[j * 3 + 2] ?? 0);
				const distSq = dx * dx + dy * dy + dz * dz;
				if (distSq < thresholdSq) {
					candidates.push({ a: i, b: j, distSq });
				}
			}
		}
		candidates.sort((p, q) => p.distSq - q.distSq);
		const segmentCount = Math.min(
			candidates.length,
			CONSTELLATION_MAX_SEGMENTS,
		);
		const array = new Float32Array(segmentCount * 6);
		for (let s = 0; s < segmentCount; s++) {
			const pair = candidates[s];
			if (!pair) continue;
			array[s * 6] = positions[pair.a * 3] ?? 0;
			array[s * 6 + 1] = positions[pair.a * 3 + 1] ?? 0;
			array[s * 6 + 2] = positions[pair.a * 3 + 2] ?? 0;
			array[s * 6 + 3] = positions[pair.b * 3] ?? 0;
			array[s * 6 + 4] = positions[pair.b * 3 + 1] ?? 0;
			array[s * 6 + 5] = positions[pair.b * 3 + 2] ?? 0;
		}
		return array;
	}, [positions]);

	useFrame((_state, delta) => {
		if (!groupRef.current) return;
		groupRef.current.rotation.y += delta * 0.02;
		groupRef.current.rotation.x += delta * 0.005;
	});

	return (
		<group ref={groupRef}>
			<points>
				<bufferGeometry>
					<bufferAttribute attach="attributes-position" args={[positions, 3]} />
					<bufferAttribute attach="attributes-color" args={[colors, 3]} />
				</bufferGeometry>
				<pointsMaterial
					vertexColors
					size={0.03}
					sizeAttenuation
					transparent
					opacity={0.85}
					blending={THREE.AdditiveBlending}
					depthWrite={false}
				/>
			</points>
			<lineSegments>
				<bufferGeometry>
					<bufferAttribute
						attach="attributes-position"
						args={[linePositions, 3]}
					/>
				</bufferGeometry>
				<lineBasicMaterial
					color={lineColor}
					transparent
					opacity={0.16}
					depthWrite={false}
				/>
			</lineSegments>
		</group>
	);
}

// Outer shell rotates and slowly "breathes" (scale oscillation); the inner
// shell is a smaller copy of the same geometry, nested as a child so it
// inherits the breathing scale, but spins the opposite direction at its own
// rate for a bit of independent life.
function WireframeIcosahedron({
	color,
	innerColor,
}: {
	color: THREE.Color;
	innerColor: THREE.Color;
}) {
	const meshRef = useRef<THREE.Mesh>(null);
	const innerRef = useRef<THREE.Mesh>(null);

	useFrame((state, delta) => {
		if (meshRef.current) {
			meshRef.current.rotation.y += delta * 0.05;
			meshRef.current.rotation.x += delta * 0.02;
			const breathe = 1 + 0.04 * Math.sin(state.clock.elapsedTime * 0.5);
			meshRef.current.scale.setScalar(breathe);
		}
		if (innerRef.current) {
			innerRef.current.rotation.y -= delta * 0.08;
			innerRef.current.rotation.x -= delta * 0.03;
		}
	});

	return (
		<mesh ref={meshRef} position={[2.4, 0.4, -1.5]}>
			<icosahedronGeometry args={[1.6, 1]} />
			<meshBasicMaterial color={color} wireframe transparent opacity={0.5} />
			<mesh ref={innerRef} scale={0.55}>
				<icosahedronGeometry args={[1.6, 1]} />
				<meshBasicMaterial
					color={innerColor}
					wireframe
					transparent
					opacity={0.25}
				/>
			</mesh>
		</mesh>
	);
}

// Tracks normalized pointer position on `window` and lerps a parent group's
// rotation toward it each frame for a subtle cursor-parallax effect. Also
// tracks scroll progress through the hero (the canvas fills the hero exactly,
// since every ancestor between it and the hero container is `absolute
// inset-0`, so the canvas's own bounding rect doubles as the hero's) and
// folds a small extra rotation + z drift into the same lerp targets as the
// user scrolls away. Kept inside the Canvas since useFrame is only usable
// there.
function ParallaxGroup({ children }: { children: React.ReactNode }) {
	const groupRef = useRef<THREE.Group>(null);
	const pointer = useRef({ x: 0, y: 0 });
	const scrollProgress = useRef(0);
	const { gl } = useThree();

	useEffect(() => {
		function handlePointerMove(event: PointerEvent) {
			pointer.current = {
				x: (event.clientX / window.innerWidth) * 2 - 1,
				y: (event.clientY / window.innerHeight) * 2 - 1,
			};
		}
		window.addEventListener("pointermove", handlePointerMove, {
			passive: true,
		});
		return () => {
			window.removeEventListener("pointermove", handlePointerMove);
		};
	}, []);

	useEffect(() => {
		const canvas = gl.domElement;
		function handleScroll() {
			const rect = canvas.getBoundingClientRect();
			const heroHeight = rect.height || window.innerHeight;
			const progress = -rect.top / heroHeight;
			scrollProgress.current = THREE.MathUtils.clamp(progress, 0, 1);
		}
		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [gl]);

	useFrame(() => {
		if (!groupRef.current) return;
		const scroll = scrollProgress.current;
		// Subtle: a few degrees max in either axis, plus up to ~0.15 rad more
		// as the hero scrolls away, and a slight backward drift in z.
		const targetY = pointer.current.x * 0.12 + scroll * 0.15;
		const targetX = -pointer.current.y * 0.08;
		groupRef.current.rotation.y = THREE.MathUtils.lerp(
			groupRef.current.rotation.y,
			targetY,
			0.03,
		);
		groupRef.current.rotation.x = THREE.MathUtils.lerp(
			groupRef.current.rotation.x,
			targetX,
			0.03,
		);
		groupRef.current.position.z = THREE.MathUtils.lerp(
			groupRef.current.position.z,
			-scroll * 0.8,
			0.04,
		);
	});

	return <group ref={groupRef}>{children}</group>;
}

function SceneContents() {
	const { resolvedMode } = useTheme();
	const [colors, setColors] = useState<SceneColors>(FALLBACK_COLORS);

	// biome-ignore lint/correctness/useExhaustiveDependencies: resolvedMode is an intentional re-run trigger for the DOM re-read below, not a value the effect body consumes.
	useEffect(() => {
		setColors(readSceneColors());
	}, [resolvedMode]);

	return (
		<ParallaxGroup>
			<ParticleField
				colorA={colors.muted}
				colorB={colors.accentText}
				lineColor={colors.accentText}
			/>
			<WireframeIcosahedron
				color={colors.accent}
				innerColor={colors.accentText}
			/>
		</ParallaxGroup>
	);
}

// Lazy-loaded (via React.lazy in SceneMount) React Three Fiber hero scene for
// the Spatial theme: a drifting particle field + a slowly rotating wireframe
// icosahedron, with subtle cursor parallax. Transparent background so the
// static CSS nebula (SpatialBackdrop) shows through. No drei, no
// postprocessing — kept intentionally small per the docs/03-themes.md
// "3D implementation rules" contract.
export default function HeroScene() {
	return (
		<Canvas
			dpr={[1, 1.5]}
			gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
			camera={{ position: [0, 0, 6], fov: 50 }}
			style={{
				position: "absolute",
				inset: 0,
				width: "100%",
				height: "100%",
				pointerEvents: "none",
			}}
		>
			<SceneContents />
		</Canvas>
	);
}
