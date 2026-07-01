import { CursorBlink } from "#/components/terminal/CursorBlink";
import { profile, skills } from "#/content";
import { cn } from "#/lib/utils";

const frontendGroup = skills.find((group) => group.category === "Frontend");
const backendGroup = skills.find((group) => group.category === "Backend");

const frontend = (frontendGroup?.items ?? []).slice(0, 4).map((s) => s.name);
const backend = (backendGroup?.items ?? []).slice(0, 3).map((s) => s.name);

const commercial = `${profile.yearsCommercial}+ yrs`;
const programming = `${profile.yearsProgramming}+ yrs`;
const available = profile.availability !== "unavailable";

function Str({ children }: { children: string }) {
	return <span className="text-accent">"{children}"</span>;
}

function Key({ children }: { children: string }) {
	return <span className="text-foreground">{children}</span>;
}

function Punct({ children }: { children: string }) {
	return <span className="text-subtle">{children}</span>;
}

function Bool({ value }: { value: boolean }) {
	return <span className="text-warning">{String(value)}</span>;
}

function StringArray({ items }: { items: string[] }) {
	return (
		<>
			<Punct>[</Punct>
			{items.map((item, i) => (
				<span key={item}>
					<Str>{item}</Str>
					{i < items.length - 1 ? <Punct>, </Punct> : null}
				</span>
			))}
			<Punct>]</Punct>
		</>
	);
}

// Hero code block: renders the `engineer` object as hand-rolled
// syntax-highlighted, monospaced code (no highlighting library).
export function CodeBlock({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				"rounded-md border border-border bg-surface p-5 shadow-[var(--shadow-sm)] sm:p-6",
				className,
			)}
		>
			<div className="mb-4 flex items-center gap-1.5" aria-hidden="true">
				<span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
				<span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
				<span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
			</div>
			<pre className="overflow-x-auto font-mono text-sm leading-relaxed sm:text-base">
				<code>
					<span className="text-accent">const</span> <Key>engineer</Key>{" "}
					<Punct>=</Punct> <Punct>{"{"}</Punct>
					{"\n"}
					{"  "}
					<Key>name</Key>
					<Punct>: </Punct>
					<Str>{profile.name}</Str>
					<Punct>,</Punct>
					{"\n"}
					{"  "}
					<Key>role</Key>
					<Punct>: </Punct>
					<Str>{profile.role}</Str>
					<Punct>,</Punct>
					{"\n"}
					{"  "}
					<Key>location</Key>
					<Punct>: </Punct>
					<Str>{profile.location}</Str>
					<Punct>,</Punct>
					{"\n"}
					{"  "}
					<Key>experience</Key>
					<Punct>: </Punct>
					<Punct>{"{ "}</Punct>
					<Key>commercial</Key>
					<Punct>: </Punct>
					<Str>{commercial}</Str>
					<Punct>, </Punct>
					<Key>programming</Key>
					<Punct>: </Punct>
					<Str>{programming}</Str>
					<Punct>{" }"}</Punct>
					<Punct>,</Punct>
					{"\n"}
					{"  "}
					<Key>frontend</Key>
					<Punct>: </Punct>
					<StringArray items={frontend} />
					<Punct>,</Punct>
					{"\n"}
					{"  "}
					<Key>backend</Key>
					<Punct>: </Punct>
					<StringArray items={backend} />
					<Punct>,</Punct>
					{"\n"}
					{"  "}
					<Key>available</Key>
					<Punct>: </Punct>
					<Bool value={available} />
					<Punct>,</Punct>
					{"\n"}
					<Punct>{"}"}</Punct>
					<CursorBlink />
				</code>
			</pre>
		</div>
	);
}
