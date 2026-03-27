import { Post } from "../types";

export const getDateTimeString = (publishedAt: string | undefined) => {
  if (!publishedAt) return "some point in time";
  const publishedAtDate = new Date(publishedAt);
  return `${publishedAtDate.toLocaleDateString()}, ${publishedAtDate.toLocaleTimeString()}`;
};

export const getDateString = (publishedAt: string | undefined) => {
  if (!publishedAt) return "";
  const publishedAtDate = new Date(publishedAt);
  return publishedAtDate.toLocaleDateString();
};

export const sortAscendingByPublishedAt = (a: Post, b: Post) =>
  a.publishedAt > b.publishedAt ? -1 : b.publishedAt > a.publishedAt ? 1 : 0;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function formatRange(from: string, to: string | null): string {
  return `${formatDate(from)} – ${to ? formatDate(to) : "Present"}`;
}

export function formatDuration(from: string, to: string | null): string {
  const start = new Date(from);
  const end = to ? new Date(to) : new Date();
  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  if (end.getDate() >= start.getDate()) months += 1;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  if (remainingMonths > 0)
    parts.push(`${remainingMonths} ${remainingMonths === 1 ? "mo" : "mos"}`);
  return parts.join(" ") || "1 mo";
}
