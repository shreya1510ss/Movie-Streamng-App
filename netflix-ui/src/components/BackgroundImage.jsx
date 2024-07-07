import React from 'react'
import background from "../assets/login.jpg"
import styled from 'styled-components'

const Container=styled.div`
height:100vh;
width:100vw;

img{
  height:100vh;
  width:100vw;

}

`;

const BackgroundImage = () => {
  return (
    <Container>
      <img src={background} alt="background" />
      
    </Container>
  )
}

export default BackgroundImage
