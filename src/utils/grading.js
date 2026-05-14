export function calculateGrade(marks) {
  if (marks >= 90) {
    return { grade: 'A+', point: 10 }
  }

  if (marks >= 80) {
    return { grade: 'A', point: 9 }
  }

  if (marks >= 70) {
    return { grade: 'B+', point: 8 }
  }

  if (marks >= 60) {
    return { grade: 'B', point: 7 }
  }

  if (marks >= 50) {
    return { grade: 'C', point: 6 }
  }

  return { grade: 'F', point: 0 }
}
