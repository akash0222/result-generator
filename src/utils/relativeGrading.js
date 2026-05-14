export const calculateMean = (marks) => {

  const total =
    marks.reduce(
      (sum, mark) => sum + mark.total,
      0
    )

  return total / marks.length
}

// STANDARD DEVIATION
export const calculateSD = (
  marks,
  mean
) => {

  const variance =
    marks.reduce((sum, mark) => {

      return (
        sum +
        Math.pow(mark.total - mean, 2)
      )

    }, 0) / marks.length

  return Math.sqrt(variance)
}

// RELATIVE GRADE
export const getRelativeGrade = (
  score,
  mean,
  sd
) => {

  const z =
    (score - mean) / sd

  if (z >= 1.5) return 'A+'

  if (z >= 0.5) return 'A'

  if (z >= -0.5) return 'B+'

  if (z >= -1.5) return 'B'

  return 'C'
}