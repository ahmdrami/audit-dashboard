import React, { useState, memo } from 'react'
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  LinearProgress,
  ListSubheader,
  Divider
} from '@material-ui/core'
import styled from 'styled-components'
import { fbStorage, db } from '../App'

const StyledListItem = styled(ListItem)`
  && {
    display: flex;
    flex-wrap: wrap;
  }
`
const StyledProgress = styled(LinearProgress)`
  && {
    width: 100%;
    margin-top: 8px;
  }
`
const Upload = memo(({ images, categoryId, onUploadComplete }) => {
  const [imagesDbRef] = useState(() => db.ref(`images/${categoryId}`))
  const [fetching, setFetching] = useState(() => false)

  const uploadFiles = async () => {
    setFetching(true)
    try {
      await uploadFilesMeta(await fbStorage.ref().putFiles(images, categoryId))
      setFetching(true)
      onUploadComplete()
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
          await imagesDbRef.push({
            categoryId,
            name: metadata.name,
            url: url,
            updated: metadata.updated
          })
        }
      })
    )
  }
  const previewImage = img => URL.createObjectURL(img)
  return (
    (images.length > 0 && (
      <>
        <List
          dense
          subheader={
            <ListSubheader component="div">
             Category: {categoryId}
            </ListSubheader>
          }
        >
          {images.map((img, index) => (
            <StyledListItem key={img.name + index} button>
              <ListItemAvatar>
                <Avatar alt={`Avatar n°${img.name}`} src={previewImage(img)} />
              </ListItemAvatar>
              <ListItemText primary={img.name} />
              {fetching && <StyledProgress />}
              <Divider />
            </StyledListItem>
          ))}
        </List>
        <Button color="primary" variant="contained" onClick={uploadFiles}>
          Upload
        </Button>
      </>
    )) ||
    null
  )
}
)
export default Upload
