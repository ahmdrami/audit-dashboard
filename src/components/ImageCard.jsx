import React, { memo } from 'react'
import {
  Card,
  CardMedia,
  CardActions,
  IconButton,
  Typography
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/DeleteRounded'
import styled from 'styled-components'

const StyledCard = styled(Card)`
  && {
    margin: 2em 0;
    ${({ placeholder }) =>
      placeholder &&
      ` 
      background-color: #e4e4e4;
      display: flex;
      height: 50vh;
      justify-content: center;
      align-items:center;
      `}
  }
`
const ImageCard = memo(({ url, name, onDelete, placeholder, session }) => {
  return placeholder ? (
    <StyledCard elevation={0} placeholder="true">
      <Typography variant="subtitle2">
        Upload content
      </Typography>
    </StyledCard>
  ) : (
    <StyledCard>
      <CardMedia component="img" title={name} src={url} />
      <CardActions disableActionSpacing>
        {session && (
          <IconButton onClick={onDelete} aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
    </StyledCard>
  )
})

export default ImageCard
