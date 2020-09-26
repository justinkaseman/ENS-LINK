export const calculateCost = (name: string) => {
  if (name.length === 3) return 5
  if (name.length === 4) return 160
  return 640
}
