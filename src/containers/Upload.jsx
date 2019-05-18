import React, { useState } from 'react'
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Paper
} from '@material-ui/core'
import styled from 'styled-components'

const StyledPaper = styled(Paper)`
  margin-top: 1em;
`;
const Upload = ({ images }) => {
  const uploadFiles = () => {
    // const data = new FormData()
    // images.forEach((image: IImageMeta) => {
    //   data.append('file', image.file)
    // })
    // const uploadImages = await fetch('http://localhost:8000/upload', {
    //   method: 'POST',
    //   body: data
    // })
    // const uploadImagesResponse: any[] = await uploadImages.json()
    // uploadImagesResponse.forEach((file, index) => {
    //   delete images[index].file
    //   images[index].path = file.filename
    //   uploadImagesMeta(images[index])
    // })
    // setImages([])
  }
  return (
    (images.length > 0 && (
      <StyledPaper elevation={1}>
        <List dense>
          {images.map(({ name, category }, index) => (
            <ListItem key={name + index} button>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${name}`}
                  src={`/static/images/avatar/${name + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText primary={name} />
              {/* <ListItemSecondaryAction>
         
        </ListItemSecondaryAction> */}
            </ListItem>
          ))}
        </List>
      </StyledPaper>
    )) ||
    null
  )
}

export default Upload
