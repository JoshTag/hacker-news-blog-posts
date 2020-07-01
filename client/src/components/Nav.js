import React from "react"
import styled from "styled-components"
import { colours, device } from "./../styles/master"

const Header = styled.header`
  height: 80px;
  width: 100%;
  background-color: ${colours.transparent};
  position: fixed;
  z-index: 10000;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const NavIcon = styled.p`
  height: 50px;
  width: 50px;
  color: ${props => (props.dark === true ? "black" : "white")};
  border: 2px solid ${props => (props.dark === true ? "black" : "white")};
  border-radius: 2px;
  margin: 15px 0 0 30px;
  text-align: center;
  line-height: 45px;
  @media ${device.laptop} {
    margin-left: 80px;
  }
`

const DarkMode = styled.p`
  height: 50px;
  padding: 12px;
  border: 2px solid ${props => (props.dark === true ? "black" : "white")};
  border-radius: 2px;
  background-color: transparent;
  color: ${props => (props.dark === true ? "black" : "white")};
  margin: 15px 30px 0 0;
  :hover {
    cursor: pointer;
  }
  @media ${device.laptop} {
    margin-right: 80px;
  }
`

const Nav = ({ darkMode, dark }) => {
  return (
    <Header>
      <NavIcon dark={dark}>HN:</NavIcon>
      <DarkMode onClick={darkMode} dark={dark}>
        {dark ? "Light Mode" : "Dark Mode"}
      </DarkMode>
    </Header>
  )
}

export default Nav
