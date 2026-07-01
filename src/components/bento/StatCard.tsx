type StatCardProps = {
	value: string;
	label: string;
	className?: string;
};

export function StatCard({ value, label, className }: StatCardProps) {
	return (
		<div className={className}>
			<div className="font-display text-3xl font-semibold text-foreground">
				{value}
			</div>
			<div className="text-sm text-muted">{label}</div>
		</div>
	);
}
