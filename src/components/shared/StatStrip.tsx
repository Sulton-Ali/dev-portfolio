type StatStripProps = { stats: Array<{ value: string; label: string }> };

export function StatStrip({ stats }: StatStripProps) {
	return (
		<div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
			{stats.map((stat) => (
				<div key={stat.label} className="flex flex-col gap-1">
					<span className="font-display text-3xl font-bold text-foreground">
						{stat.value}
					</span>
					<span className="text-sm text-muted">{stat.label}</span>
				</div>
			))}
		</div>
	);
}
