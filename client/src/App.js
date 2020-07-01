import React, { useEffect, useState } from "react"
import Nav from "./components/Nav"
import Hero from "./components/Hero"
import BlogPost from "./components/BlogPost"
import Filters from "./components/Filters"
import "./App.scss"
import { colours, device } from "./styles/master"
import axios from "axios"
import styled from "styled-components"
import InfiniteScroll from "react-infinite-scroller"

const Wrapper = styled.div`
  background-color: ${props =>
    props.dark === true ? colours.dark : colours.primary};
`

const BlogContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
  @media ${device.tablet} {
    width: 700px;
  }
  @media ${device.laptop} {
    width: 900px;
  }
  @media ${device.desktop} {
    width: 1100px;
  }
`

const FilterContainer = styled.div`
  position: sticky;
  top: 85px;
  margin: 0 auto;
  width: 300px;
  @media ${device.tablet} {
    width: 700px;
  }
`

const LoadingSkeleton = styled.div`
  margin-bottom: 100px;
  color: ${props => (props.dark === true ? "white" : "black")};
`

function App() {
  const [stories, setStories] = useState([])
  const [constStories, setConstStories] = useState([])
  const [page, setPage] = useState(2)
  const [hasMore, setHasMore] = useState(true)
  const [oddEven, setOddEven] = useState("")
  const [maxPage, setMaxPage] = useState()
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const fetchPageOne = async () => {
      const response = await axios.get(`/api/stories?page=1`)
      const data = await response.data
      setStories(prevState => [...prevState, ...data])
      setConstStories(prevState => [...prevState, ...data])

      // Get number of story divide by 30 to get max pages
      const idResponse = await axios.get(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
      )
      const idData = await idResponse.data
      setMaxPage(Math.ceil(idData.length / 30))
    }
    fetchPageOne()
  }, [])

  const loadNextPage = () => {
    if (!stories.length) {
      return
    }
    if (page > maxPage) {
      setHasMore(false)
      return
    }
    axios.get(`/api/stories?page=${page}`).then(async res => {
      await setStories(prevState => [...prevState, ...res.data])
      await setConstStories(prevState => [...prevState, ...res.data])
      await setPage(prevState => prevState + 1)
    })
  }

  const handleOddEvenChange = event => {
    setOddEven(event.target.value)
  }

  const handleOddEvenSubmit = e => {
    e.preventDefault()
    if (oddEven === "odd") {
      const returnOdd = constStories.filter((item, index) => {
        return index % 2 !== 0
      })

      setStories(returnOdd)
    } else {
      const returnEven = constStories.filter((item, index) => {
        return index % 2 === 0
      })

      setStories(returnEven)
    }
  }

  const handleSearchSubmit = e => {
    e.preventDefault()
    let findItem = constStories.filter(story => {
      return story["title"]
        .toLowerCase()
        .includes(e.target.search.value.toLowerCase())
    })

    setStories(findItem)
    e.target.search.value = ""
  }

  const clearFilters = () => {
    setStories(constStories)
  }

  const darkMode = () => {
    setDark(!dark)
  }

  const StoryMap =
    stories &&
    stories.map(story => {
      if (!story) {
        return null
      }
      return <BlogPost dark={dark} story={story} key={story.id} />
    })

  return (
    <Wrapper dark={dark}>
      <Nav darkMode={darkMode} dark={dark} />
      <Hero />
      <FilterContainer>
        <Filters
          handleOddEvenChange={handleOddEvenChange}
          handleOddEvenSubmit={handleOddEvenSubmit}
          oddEven={oddEven}
          handleSearchSubmit={handleSearchSubmit}
          clearFilters={clearFilters}
        />
      </FilterContainer>
      <BlogContainer>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadNextPage}
          hasMore={hasMore}
          initialLoad={false}
          threshold={1}
          loader={
            <LoadingSkeleton dark={dark} className="loader" key={0}>
              Loading...
            </LoadingSkeleton>
          }
        >
          {StoryMap}
        </InfiniteScroll>
      </BlogContainer>
    </Wrapper>
  )
}

export default App
