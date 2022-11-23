export const roundTo = (n: number, multiple: number) => {
  if (multiple == 0) return n;

  let remainder = Math.abs(n) % multiple;
  if (remainder == 0) return n;

  if (n < 0) {
    return -(Math.abs(n) - remainder);
  } else {
    return n + multiple - remainder;
  }
};
