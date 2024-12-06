export default function normalizeTimestamp(timestamp) {
  //mtime from storage always varies due to latency. rounding off milliseconds to discard this latency.
  const date = new Date(timestamp);
  // Round or truncate the milliseconds
  const newDate = new Date(Math.floor(date.getTime() / 1000) * 1000);
  return newDate.getTime();
}
