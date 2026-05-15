import PublishResult
from '../models/PublishResult.js'

// GET STATUS
export const getPublishStatus =
  async (req, res) => {

    try {

      const status =
        await PublishResult.find()

      res.json(status)

    } catch (error) {

      res.status(500).json({
        message: error.message
      })
    }
  }

// PUBLISH RESULT
export const publishResult =
  async (req, res) => {

    try {

      const { semester } =
        req.body

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

      } else {

        // UPDATE
        result.published = true

        await result.save()
      }

      res.json({
        message:
          `Semester ${semester} result published`
      })

    } catch (error) {

      res.status(500).json({
        message: error.message
      })
    }
  }

// UNPUBLISH
export const unpublishResult =
  async (req, res) => {

    try {

      const { semester } =
        req.body

      const result =
        await PublishResult.findOne({
          semester
        })

      if (!result) {

        return res.status(404).json({
          message:
            'Result status not found'
        })
      }

      result.published = false

      await result.save()

      res.json({
        message:
          `Semester ${semester} unpublished`
      })

    } catch (error) {

      res.status(500).json({
        message: error.message
      })
    }
  }