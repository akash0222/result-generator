import sendEmail
from '../utils/sendEmail.js'

// ======================
// SEND RESULT EMAIL
// ======================
export const sendResultEmail =
  async (req, res) => {

    try {

      const {

        email,
        studentName,
        semester

      } = req.body

      // ======================
      // VALIDATION
      // ======================

      if (!email) {

        return res.status(400).json({

          success: false,

          message:
            'Student email is required'
        })
      }

      if (!studentName) {

        return res.status(400).json({

          success: false,

          message:
            'Student name is required'
        })
      }

      // ======================
      // EMAIL SUBJECT
      // ======================

      const subject =
        `Semester ${semester || ''} Result Published`

      // ======================
      // EMAIL MESSAGE
      // ======================

      const message =

`Hello ${studentName},

Your semester result has been officially published on the ERP portal.

You can now:

• Login to your student dashboard
• View your marks
• Download your official grade card
• Check SGPA / CGPA

Portal Access:
ERP Student Dashboard

Regards,
Controller of Examination
IILM Institute for Higher Education`

      // ======================
      // SEND EMAIL
      // ======================

      await sendEmail(

        email,

        subject,

        message
      )

      // ======================
      // RESPONSE
      // ======================

      res.json({

        success: true,

        message:
          'Result email sent successfully'
      })

    } catch (error) {

      console.log(error)

      res.status(500).json({

        success: false,

        message:
          error.message
      })
    }
  }