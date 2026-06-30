export function cn(
	...classes: Array<string | false | null | undefined>
): string {
	return classes.filter(Boolean).join(" ");
}

const MONTH_NAMES: string[] = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

export function formatDateRange(
	start: string,
	end: string | "present",
): string {
	const toLabel = (yyyyMm: string): string => {
		const dash = yyyyMm.indexOf("-");
		if (dash === -1) return yyyyMm;
		const year = yyyyMm.slice(0, dash);
		const month = Number.parseInt(yyyyMm.slice(dash + 1), 10);
		return `${MONTH_NAMES[month - 1] ?? ""} ${year}`.trim();
	};

	const endLabel = end === "present" ? "Present" : toLabel(end);
	return `${toLabel(start)} – ${endLabel}`;
}
