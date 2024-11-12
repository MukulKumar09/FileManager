export default function normalizeTimestamp(timestamp) {
  const date = new Date(timestamp);
  // Round or truncate the milliseconds
  const newDate = new Date(Math.floor(date.getTime() / 1000) * 1000);
  return newDate.getTime();
}
