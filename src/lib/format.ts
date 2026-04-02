import { format, parseISO } from "date-fns";

import { siteConfig } from "@/data/site";

const chapterTimeZone = siteConfig.timeZone;

function isDateOnly(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function formatDateOnly(value: string, pattern: string) {
  return format(parseISO(value), pattern);
}

function formatInChapterTimeZone(
  value: string,
  options: Intl.DateTimeFormatOptions,
) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: chapterTimeZone,
    ...options,
  }).format(new Date(value));
}

function formatParts(
  value: string,
  options: Intl.DateTimeFormatOptions,
) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: chapterTimeZone,
    ...options,
  }).formatToParts(new Date(value));
}

export function getChapterDayKey(value: string) {
  const parts = formatParts(value, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const year = parts.find((part) => part.type === "year")?.value ?? "";
  const month = parts.find((part) => part.type === "month")?.value ?? "";
  const day = parts.find((part) => part.type === "day")?.value ?? "";

  return `${year}-${month}-${day}`;
}

export function formatFullDate(date: string) {
  if (isDateOnly(date)) {
    return formatDateOnly(date, "MMMM d, yyyy");
  }

  return formatInChapterTimeZone(date, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatMonth(date: string) {
  if (isDateOnly(date)) {
    return formatDateOnly(date, "MMM");
  }

  return formatInChapterTimeZone(date, { month: "short" });
}

export function formatDay(date: string) {
  if (isDateOnly(date)) {
    return formatDateOnly(date, "d");
  }

  return formatInChapterTimeZone(date, { day: "numeric" });
}

export function formatMonthDay(date: string) {
  if (isDateOnly(date)) {
    return formatDateOnly(date, "MMMM d");
  }

  return formatInChapterTimeZone(date, {
    month: "long",
    day: "numeric",
  });
}

export function formatShortDate(date: string) {
  if (isDateOnly(date)) {
    return formatDateOnly(date, "MMM d, yyyy");
  }

  return formatInChapterTimeZone(date, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTime(date: string) {
  return formatInChapterTimeZone(date, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatTimeRange(startDate: string, endDate: string) {
  return `${formatTime(startDate)} to ${formatTime(endDate)}`;
}

export function formatDateRange(startDate: string, endDate: string) {
  const sameDay = getChapterDayKey(startDate) === getChapterDayKey(endDate);

  if (sameDay) {
    return `${formatFullDate(startDate)} · ${formatTime(startDate)} to ${formatTime(endDate)}`;
  }

  return `${formatFullDate(startDate)} ${formatTime(startDate)} to ${formatFullDate(endDate)} ${formatTime(endDate)}`;
}
