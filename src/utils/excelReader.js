import * as XLSX from 'xlsx'

// ======================
// READ EXCEL FILE
// ======================

export const readExcelFile = (

  file,
  callback

) => {

  // ======================
  // VALIDATE FILE
  // ======================

  if (!file) {

    alert(
      'Please select a file'
    )

    return
  }

  // ======================
  // VALID FILE TYPES
  // ======================

  const validExtensions = [

    'xlsx',
    'xls'
  ]

  const fileExtension =
    file.name
      .split('.')
      .pop()
      .toLowerCase()

  if (

    !validExtensions.includes(
      fileExtension
    )

  ) {

    alert(

      'Only Excel files are allowed'
    )

    return
  }

  // ======================
  // FILE READER
  // ======================

  const reader =
    new FileReader()

  reader.onload = (e) => {

    try {

      const data =
        e.target.result

      // ======================
      // READ WORKBOOK
      // ======================

      const workbook =
        XLSX.read(data, {

          type: 'binary'
        })

      // ======================
      // FIRST SHEET
      // ======================

      const sheetName =
        workbook.SheetNames[0]

      const worksheet =
        workbook.Sheets[sheetName]

      // ======================
      // CONVERT JSON
      // ======================

      const jsonData =

        XLSX.utils.sheet_to_json(
          worksheet
        )

      // EMPTY FILE
      if (
        jsonData.length === 0
      ) {

        alert(
          'Excel file is empty'
        )

        return
      }

      // CALLBACK
      callback(jsonData)

    } catch (error) {

      console.log(error)

      alert(
        'Error reading Excel file'
      )
    }
  }

  // ======================
  // READ FILE
  // ======================

  reader.readAsBinaryString(
    file
  )
}