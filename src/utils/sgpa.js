export function calculateSGPA(subjects) {
  let totalCredits = 0
  let weightedPoints = 0

  subjects.forEach((subject) => {
    totalCredits += subject.credit
    weightedPoints +=
      subject.credit * subject.gradePoint
  })

  return (weightedPoints / totalCredits).toFixed(2)
}
