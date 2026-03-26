import { format, parseISO } from "date-fns";

export function formatFullDate(date: string) {
  return format(parseISO(date), "MMMM d, yyyy");
}

export function formatMonth(date: string) {
  return format(parseISO(date), "MMM");
}

export function formatDay(date: string) {
  return format(parseISO(date), "d");
}

export function formatMonthDay(date: string) {
  return format(parseISO(date), "MMMM d");
}

export function formatShortDate(date: string) {
  return format(parseISO(date), "MMM d, yyyy");
}

export function formatTime(date: string) {
  return format(parseISO(date), "h:mm a");
}

export function formatDateRange(startDate: string, endDate: string) {
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  const sameDay = format(start, "yyyy-MM-dd") === format(end, "yyyy-MM-dd");

  if (sameDay) {
    return `${format(start, "MMMM d, yyyy")} · ${format(start, "h:mm a")} to ${format(end, "h:mm a")}`;
  }

  return `${format(start, "MMMM d, yyyy h:mm a")} to ${format(end, "MMMM d, yyyy h:mm a")}`;
}
