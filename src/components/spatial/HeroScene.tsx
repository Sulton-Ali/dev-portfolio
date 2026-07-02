import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "#/theme/ThemeProvider";

const PARTICLE_COUNT = 1400;
const PARTICLE_RADIUS_X = 6;
const PARTICLE_RADIUS_Y = 3.2;
const PARTICLE_RADIUS_Z = 4;

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
function ParticleField({
	colorA,
	colorB,
}: {
	colorA: THREE.Color;
	colorB: THREE.Color;
}) {
	const pointsRef = useRef<THREE.Points>(null);

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

	useFrame((_state, delta) => {
		if (!pointsRef.current) return;
		pointsRef.current.rotation.y += delta * 0.02;
		pointsRef.current.rotation.x += delta * 0.005;
	});

	return (
		<points ref={pointsRef}>
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
	);
}

function WireframeIcosahedron({ color }: { color: THREE.Color }) {
	const meshRef = useRef<THREE.Mesh>(null);

	useFrame((_state, delta) => {
		if (!meshRef.current) return;
		meshRef.current.rotation.y += delta * 0.05;
		meshRef.current.rotation.x += delta * 0.02;
	});

	return (
		<mesh ref={meshRef} position={[2.4, 0.4, -1.5]}>
			<icosahedronGeometry args={[1.6, 1]} />
			<meshBasicMaterial color={color} wireframe transparent opacity={0.5} />
		</mesh>
	);
}

// Tracks normalized pointer position on `window` and lerps a parent group's
// rotation toward it each frame for a subtle cursor-parallax effect. Kept
// inside the Canvas since useFrame is only usable there.
function ParallaxGroup({ children }: { children: React.ReactNode }) {
	const groupRef = useRef<THREE.Group>(null);
	const pointer = useRef({ x: 0, y: 0 });

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

	useFrame(() => {
		if (!groupRef.current) return;
		// Subtle: a few degrees max in either axis.
		const targetY = pointer.current.x * 0.12;
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
			<ParticleField colorA={colors.muted} colorB={colors.accentText} />
			<WireframeIcosahedron color={colors.accent} />
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
