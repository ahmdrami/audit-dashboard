import React, { useState } from 'react'
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Button
} from '@material-ui/core'
import styled from 'styled-components'
import { fbStorage, db } from '../App'

const StyledPaper = styled(Paper)`
  margin-top: 1em;
`

const Upload = ({ images, categoryId }) => {
  const [imagesDbRef] = useState(() => db.ref('images'))
  console.log(categoryId)
  const uploadFiles = async () => {
    console.log('upload started')
    try {
      await uploadFilesMeta(await fbStorage.ref().putFiles(images))
      console.log('upload done')
    } catch (error) {
      console.log(error)
    }
  }

  const uploadFilesMeta = async snapshots => {
    await Promise.all(
      snapshots.map(async ({ ref, metadata }) => {
        const url = await ref.getDownloadURL()
        const imageExist = await imagesDbRef
          .orderByChild('name')
          .equalTo(metadata.name)
          .once('value')

        if (!imageExist.val()) {
          imagesDbRef.push({
            categoryId,
            name: metadata.name,
            url: url,
            updated: metadata.updated
          })
        }
      })
    )
  }
  return (
    (images.length > 0 && (
      <StyledPaper elevation={1}>
        <List dense>
          {images.map(({ name }, index) => (
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
        <Button color="primary" variant="contained" onClick={uploadFiles}>
          Upload
        </Button>
      </StyledPaper>
    )) ||
    null
  )
}

export default Upload
