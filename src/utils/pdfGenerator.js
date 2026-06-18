import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export const generatePDF = (
  student,
  marks,
  sgpa
) => {

  const doc = new jsPDF()

  // TITLE
  doc.setFontSize(20)

  doc.text(
    'GRADE CARD',
    80,
    20
  )

  // STUDENT DETAILS
  doc.setFontSize(12)

  doc.text(
    `Name: ${student.name}`,
    20,
    40
  )

  doc.text(
    `Roll Number: ${student.roll}`,
    20,
    50
  )

  doc.text(
    `Course: ${student.course}`,
    20,
    60
  )

  // TABLE
  autoTable(doc, {
    startY: 80,

    head: [[
      'Subject',
      'Internal',
      'Midterm',
      'Endterm',
      'Total',
      'Grade'
    ]],

    body: marks.map((mark) => [
      mark.subject,
      mark.internal,
      mark.midterm,
      mark.endterm,
      mark.total,
      mark.grade
    ])
  })

  // SGPA
  doc.text(
    `SGPA: ${sgpa}`,
    20,
    doc.lastAutoTable.finalY + 20
  )

  // SAVE PDF
  doc.save(
    `${student.roll}_GradeCard.pdf`
  )
}