import React, { memo } from 'react'
import { Paper } from '@material-ui/core'
import styled from 'styled-components'

const StyledCard = styled(Paper)`
  flex: 100%;
  display: flex;
  margin: 1%;
  padding: 2em;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (min-width: 875px) {
    flex: 48%;
  }
  @media (min-width: 1155px) {
    flex: 31.33%;
  }
`
const MaterialCard = memo(({ children }) => {
  return <StyledCard elevation={1}>{children}</StyledCard>
})

export default MaterialCard
