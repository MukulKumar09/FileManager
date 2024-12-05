export default function unixTo12Hour(unixTimestamp) {
  // Create a JavaScript Date object from the Unix timestamp (in milliseconds)
  const date = new Date(unixTimestamp * 1000); // Convert to milliseconds

  // Extract hours, minutes, and seconds
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  // Determine AM or PM
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle 0 hours (midnight)

  // Format minutes and seconds to ensure two digits (e.g., 05 instead of 5)
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  // Return the formatted time string
  return `${hours}:${minutes}:${seconds} ${period}`;
}
