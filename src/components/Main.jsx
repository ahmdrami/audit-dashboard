import React from 'react'
import styled from 'styled-components'

const StyledMain = styled.main`
  margin-left: 200px;
  padding: 2em;
`
const Main = ({ children }) => {
  return <StyledMain>{children}</StyledMain>
}


export default Main
