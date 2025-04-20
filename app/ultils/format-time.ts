/**
 * Formats the given time in seconds into a string representation of minutes and seconds.
 * @param time - The time in seconds to format.
 * @returns The formatted time string in the format "mm:ss".
 */
export const formatTime = (time: number) => {
  let minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, '0');
  let seconds = (time % 60).toString().padStart(2, '0');

  return `${minutes}:${seconds}`;
};
