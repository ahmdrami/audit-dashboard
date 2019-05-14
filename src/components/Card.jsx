import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from '@material-ui/core'
import styled from 'styled-components'

const StyledCard = styled(Paper)`
  width: 350px;
  display: flex;
  margin: 8px;
  padding: 2em;
  align-items: center;
  justify-content: center;
  flex-direction: column;

`
const MaterialCard = ({ children }) => {
  return <StyledCard>{children}</StyledCard>
}

MaterialCard.propTypes = {}

export default MaterialCard
