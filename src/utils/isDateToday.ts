export function isDateToday(unixTimestamp: number) {
  // Get the current date (right now)
  const now = new Date();

  // Set todayStart to the current time (right now)
  const todayStart = now;

  // Set todayEnd to 24 hours from now
  const todayEnd = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours (in milliseconds)

  // Convert the Unix timestamp to a Date object
  const date = new Date(unixTimestamp * 1000); // Convert to milliseconds

  // Check if the timestamp falls between now and 24 hours later
  return date >= todayStart && date <= todayEnd;
}
