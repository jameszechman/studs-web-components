/** Ensures a number stays within a minimum and maximum value
 * @param value The number to clamp
 * @param min The minimum value
 * @param max The maximum value
 * @returns The clamped number
 * @author Shoelace
 * @license MIT
 * @see https://github.com/shoelace-style/shoelace/blob/next/src/internal/math.ts#L2
 */
export function clamp(value: number, min: number, max: number) {
  const noNegativeZero = (n: number) => (Object.is(n, -0) ? 0 : n);

  if (value < min) {
    return noNegativeZero(min);
  }

  if (value > max) {
    return noNegativeZero(max);
  }

  return noNegativeZero(value);
}