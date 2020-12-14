const median = (values: number[]): number => {
  const mid = values.length / 2;

  if (!Number.isInteger(mid)) {
    return values[Math.floor(mid)]!;
  }
  return 0.5 * (values[mid - 1]! + values[mid]!);
};

export default median;
