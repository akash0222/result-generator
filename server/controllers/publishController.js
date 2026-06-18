import PublishResult
from '../models/PublishResult.js'

// ======================
// GET PUBLISH STATUS
// ======================
export const getPublishStatus =
  async (req, res) => {

    try {

      const status =
        await PublishResult.find()

      res.json({

        success: true,

        data: status
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

// ======================
// PUBLISH RESULT
// ======================
export const publishResult =
  async (req, res) => {

    try {

      const { semester } =
        req.body

      // VALIDATION
      if (!semester) {

        return res.status(400).json({

          success: false,

          message:
            'Semester is required'
        })
      }

      let result =
        await PublishResult.findOne({

          semester
        })

      // CREATE
      if (!result) {

        result =
          await PublishResult.create({

            semester,

            published: true
          })
      }

      // UPDATE
      else {

        result.published = true

        await result.save()
      }

      res.json({

        success: true,

        message:
          `Semester ${semester} result published`
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

// ======================
// UNPUBLISH RESULT
// ======================
export const unpublishResult =
  async (req, res) => {

    try {

      const { semester } =
        req.body

      // VALIDATION
      if (!semester) {

        return res.status(400).json({

          success: false,

          message:
            'Semester is required'
        })
      }

      const result =
        await PublishResult.findOne({

          semester
        })

      // NOT FOUND
      if (!result) {

        return res.status(404).json({

          success: false,

          message:
            'Semester not found'
        })
      }

      result.published = false

      await result.save()

      res.json({

        success: true,

        message:
          `Semester ${semester} unpublished`
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