const calculateMean =
  (numbers) => {

    const sum =
      numbers.reduce(
        (a, b) => a + b,
        0
      )

    return sum / numbers.length
  }

// STANDARD DEVIATION
const calculateSD =
  (
    numbers,
    mean
  ) => {

    const variance =

      numbers.reduce(

        (acc, value) =>

          acc +
          Math.pow(
            value - mean,
            2
          ),

        0

      ) / numbers.length

    return Math.sqrt(
      variance
    )
  }

// RELATIVE GRADE
const getRelativeGrade =
  (
    total,
    mean,
    sd
  ) => {

    if (total >= mean + sd)
      return 'A+'

    if (total >= mean)
      return 'A'

    if (
      total >= mean - sd
    )
      return 'B+'

    if (
      total >=
      mean - 2 * sd
    )
      return 'B'

    if (
      total >=
      mean - 3 * sd
    )
      return 'C'

    return 'F'
  }

export {

  calculateMean,
  calculateSD,
  getRelativeGrade
}