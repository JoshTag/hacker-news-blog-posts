import React from "react"
import styled from "styled-components"
import { colours, device } from "./../styles/master"
import { formatDate } from "./../utils/format"
import placeholder from "./../assets/images/default-placeholder-image.png"

const PostContainer = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid ${props => props.dark === true ? "white" : colours.secondaryTransparent };
  @media ${device.tablet} {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 60px;
  }
  @media ${device.laptop} {

  }
`

const ImageContainer = styled.div`
  width: 300px;
  height: 300px;
  margin-bottom: 20px;
  @media ${device.laptop} {
    width: 350px;
    height: 450px;
  }
`

const PostImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center 25%;
  background-image: url(${props => props.img || placeholder});
`

const PostInfo = styled.div`
  width: 300px;
  @media ${device.tablet} {
    width: 360px;
  }
  @media ${device.laptop} {
    width: 460px;
  }
  @media ${device.desktop} {
    width: 620px;
  }
`

const PostTitle = styled.h2`
  font-weight: 400;
  font-size: 18px;
  margin-bottom: 10px;
  color: ${props => props.dark === true ? "white" : "black"};
  @media ${device.tablet} {
    font-size: 24px;
    line-height: 35px;
  }
  @media ${device.laptop} {
    margin-bottom: 20px;
  }
`

const PostDescription = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
  color: ${props => props.dark === true ? "white" : "black"};
  @media ${device.tablet} {
    font-size: 16px;
    line-height: 25px;
  }
  @media ${device.laptop} {
    margin-bottom: 50px;
  }
`

const PostAuthor = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  color: ${props => props.dark === true ? "white" : "black"};
  @media ${device.tablet} {
    font-size: 16px;
  }
  @media ${device.laptop} {
    margin-bottom: 10px;
  }
`

const PostTime = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  color: grey;
  @media ${device.tablet} {
    font-size: 16px;
  }
  @media ${device.laptop} {
    margin-bottom: 10px;
  }
`

const PostComments = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  color: grey;
  @media ${device.tablet} {
    font-size: 16px;
  }
  @media ${device.laptop} {
    margin-bottom: 10px;
  }
`

const PostLink = styled.a`
  font-size: 14px;
  text-decoration: underline;
  /* color: black; */
  color: ${props => props.dark === true ? "white" : "black"};
  :hover {
    cursor: pointer;
  }
  @media ${device.tablet} {
    font-size: 16px;
  }
`

const BlogPost = ({ story, dark }) => {
  const { by, time, title, url, kids, metadata } = story

  return (
    <PostContainer dark={dark}>
      <ImageContainer>
        <PostImage img={metadata.image} />
      </ImageContainer>
      <PostInfo>
        <PostTitle dark={dark}>{title}</PostTitle>
        <PostDescription dark={dark}>
          {metadata.description || "No Description for this Post"}
        </PostDescription>
        <PostAuthor dark={dark}>By: {by}</PostAuthor>
        <PostTime>{formatDate(time * 1000)}</PostTime>
        <PostComments>
          {kids ? `${kids.length} comments` : "0 comments"}
        </PostComments>
        <PostLink dark={dark} rel="noopener noreferrer" target="_blank" href={url}>
          Read This Article
        </PostLink>
      </PostInfo>
    </PostContainer>
  )
}

export default BlogPost
