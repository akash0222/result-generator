export function relativeGrade(score, mean, sd) {
  if (score >= mean + 1.5 * sd) {
    return 'A+'
  }

  if (score >= mean + 0.5 * sd) {
    return 'A'
  }

  if (score >= mean - 0.5 * sd) {
    return 'B+'
  }

  if (score >= mean - 1.5 * sd) {
    return 'B'
  }

  return 'C'
}
