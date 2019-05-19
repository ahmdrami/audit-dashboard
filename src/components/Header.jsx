import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

const StyledHeader = styled.div`
  padding-bottom: 2em;
  margin-top: 4em;
  margin-bottom: 2em;
  border-bottom: 2px dashed #afafaf;
  display: flex;
  flex-direction: column;
  > button {
    margin-left: auto;
  }
  > h6 {
    margin-right: auto;
    background: #f1f1f1;
    padding: 10px;
    margin-top: 1em;
  }
`
const Header = ({ children, title, subtitle }) => (
  <StyledHeader>
    <Typography variant="h3">{title}</Typography>
    {subtitle && <Typography variant="h6">{subtitle}</Typography>}
    {children}
  </StyledHeader>
)

export default Header
