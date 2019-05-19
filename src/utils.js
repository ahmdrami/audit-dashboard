export const calculateAverage = (items = []) => {
  let score = 0
  items.forEach(item => (score += Number(item.score)))
  return `${score}/${items.length * 5}`
}
