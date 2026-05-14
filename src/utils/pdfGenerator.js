import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export const generatePDF = (student) => {
  const doc = new jsPDF()

  doc.setFontSize(18)
  doc.text('GRADE CARD', 80, 20)

  doc.setFontSize(12)

  doc.text(`Name: ${student.name}`, 20, 40)
  doc.text(`Roll: ${student.roll}`, 20, 50)

  autoTable(doc, {
    startY: 70,
    head: [['Subject', 'Marks', 'Grade']],
    body: student.subjects.map((sub) => [
      sub.name,
      sub.marks,
      sub.grade
    ])
  })

  doc.save(`${student.roll}.pdf`)
}
