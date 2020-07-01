const express = require("express")
const router = express.Router()
const axios = require("axios")
const grabity = require("grabity")

router.get("/", (request, response) => {
  const page = parseInt(request.query.page) || 1 // Default query to first page and convert to Int

  const fetchData = async () => {
    // Fetch Top Stories ID in limits of 30
    const topStories = await axios.get(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    )
    const storyIDs = await topStories.data

    // Fetches Individual Story
    const fetchStories = id => {
      return axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    }

    axios
      .all(
        storyIDs.map(async i => {
          return await fetchStories(i)
        })
      )
      .then(async res => {
        // Filter out any null story and pdfs
        const allStories = await res
          .map(story => {
            return { ...story.data }
          })
          .filter(story => {
            return typeof story.url !== "undefined"
          })
          .filter(story => {
            return story.url.slice(-3) !== "pdf"
          }).slice(page * 30 - 30, page * 30) // Limit to 30 reponses

        const getMetadata = await Promise.all(
          allStories.map(async story => {
            try {
              let metadata = await grabity.grabIt(story.url)

              return { ...story, metadata }
            } catch (error) {
              console.log(error)
            }
          })
        )

        response.status(200).json(getMetadata)
      })
      .catch(err => response.status(500).json({ Error: err }))
  }

  fetchData()
})

module.exports = router
