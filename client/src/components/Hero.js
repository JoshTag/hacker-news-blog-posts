import React from "react"
import styled from "styled-components"
import { device } from "./../styles/master"
import hero from "./../assets/images/hero.jpg"

const HeroContainer = styled.section`
  height: 700px;
  padding-top: 80px;
  background-size: cover;
  background-position: center 25%;
  background-image: url(${hero});
  :after {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 700px;
    background-image: linear-gradient(90deg, #f5f5f5, #c0c0c0);
    opacity: 0.3;
    z-index: 100;
    @media ${device.desktop} {
      height: 800px;
    }
  }
  @media ${device.desktop} {
    height: 800px;
  }
`

const HeroHeader = styled.h1`
  width: 100%;
  text-align: center;
  position: absolute;
  z-index: 101;
  color: black;
  font-size: 48px;
  font-weight: 900;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  @media ${device.laptop} {
    font-size: 68px;
  }
`

const Hero = () => {
  return (
    <HeroContainer>
      <HeroHeader>Hacker News</HeroHeader>
    </HeroContainer>
  )
}

export default Hero
