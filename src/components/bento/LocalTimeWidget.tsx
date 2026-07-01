import { Clock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "#/lib/utils";

type LocalTimeWidgetProps = {
	timezone: string;
	location: string;
	className?: string;
};

function formatTime(timezone: string): string | null {
	try {
		return new Intl.DateTimeFormat(undefined, {
			timeZone: timezone,
			hour: "2-digit",
			minute: "2-digit",
		}).format(new Date());
	} catch {
		return null;
	}
}

export function LocalTimeWidget({
	timezone,
	location,
	className,
}: LocalTimeWidgetProps) {
	// Stable placeholder on first paint to avoid SSR/client hydration mismatch.
	const [time, setTime] = useState<string | null>(null);

	useEffect(() => {
		setTime(formatTime(timezone));
		const id = setInterval(() => {
			setTime(formatTime(timezone));
		}, 60_000);
		return () => clearInterval(id);
	}, [timezone]);

	return (
		<div className={cn("flex flex-col gap-2", className)}>
			<div className="flex items-center gap-2 text-foreground">
				<MapPin className="h-4 w-4 text-muted" aria-hidden="true" />
				<span>{location}</span>
			</div>
			{time && (
				<div className="flex items-center gap-2 text-muted">
					<Clock className="h-4 w-4" aria-hidden="true" />
					<span>{time}</span>
				</div>
			)}
		</div>
	);
}
