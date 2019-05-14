import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledMain = styled.main`
  margin-left: 200px;
  padding: 2em;
`
const Main = ({ children }) => {
  return <StyledMain>{children}</StyledMain>
}

Main.propTypes = {}

export default Main
