export function updateScore(amount) {
  const elmt = document.getElementById('score')
  let score = Number(elmt.textContent)
  score += amount
  let text = score.toString()
  while (text.length < 5) {
    text = "0" + text
  }
  elmt.textContent = text
}