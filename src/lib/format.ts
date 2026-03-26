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

