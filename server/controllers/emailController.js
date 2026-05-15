import sendEmail
from '../utils/sendEmail.js'

export const sendResultEmail =
  async (req, res) => {

    try {

      const {
        email,
        studentName
      } = req.body

      await sendEmail(

        email,

        'Result Published',

        `Hello ${studentName},

Your semester result has been published.

Please login to the ERP portal to download your grade card.

Regards,
IILM ERP`
      )

      res.json({
        message:
          'Email sent successfully'
      })

    } catch (error) {

      res.status(500).json({
        message: error.message
      })
    }
  }