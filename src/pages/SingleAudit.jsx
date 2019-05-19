import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { StyledFab, Transition } from './Audits'
import CloudIcon from '@material-ui/icons/CloudUploadRounded'
import { Dialog, DialogContent } from '@material-ui/core'
import Upload from '../containers/Upload'
import { db, fbStorage } from '../App'
import { mapIds } from './Home'
import ImageCard from '../components/ImageCard'

const StyledInput = styled.input`
  display: none;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const StyledDialogContent = styled(DialogContent)`
  && {
    display: flex;
    flex-direction: column;

    > button {
      margin: auto;
    }
  }
`
const getImages = files => Array.from(files)

export default function SingleAudit({ categoryId, session }) {
  const [imagesDbRef] = useState(() => db)

  const [state, setState] = useState(() => ({
    images: [],
    open: false,
    categoryImages: []
  }))

  useEffect(() => {
    imagesDbRef.ref(`images/${categoryId}`).on('value', snapshot => {
      setState(s => ({ ...s, categoryImages: mapIds(snapshot.val()) }))
    })

    return () => {
      setState(s => ({ ...s, categoryImages: [] }))
    }
  }, [categoryId, imagesDbRef])

  const onInputFiles = ({ target }) => {
    if (target.files) {
      setState(s => ({ ...s, images: getImages(target.files), open: true }))
      target.value = ''
    }
  }

  const onClose = () => setState(s => ({ ...s, open: false }))

  const onDelete = image => async () => {
    try {
      await fbStorage.ref(`${image.categoryId}/${image.name}`).delete()
      await imagesDbRef
        .ref(`images/${image.categoryId}/${image.id}`)
        .remove(null)
      setState(s => ({
        ...s,
        categoryImages: s.categoryImages.filter(img => img.id !== image.id)
      }))
    } catch (error) {}
  }
  return (
    <Container className="page">
      {session && (
        <>
          <StyledInput
            id="image-upload"
            accept="image/*"
            type="file"
            onChange={onInputFiles}
            multiple
          />

          <label htmlFor="image-upload">
            <StyledFab
              size="large"
              variant="extended"
              component="span"
              color="primary"
            >
              <CloudIcon /> Upload Images to {categoryId}
            </StyledFab>
          </label>
        </>
      )}

      {state.categoryImages.length > 0 ? (
        state.categoryImages.map(image => (
          <ImageCard session={session} key={image.id} {...image} onDelete={onDelete(image)} />
        ))
      ) : (
        <ImageCard placeholder />
      )}
      <Dialog
        open={state.open}
        onClose={onClose}
        TransitionComponent={Transition}
        maxWidth="sm"
        fullWidth
      >
        <StyledDialogContent>
          <Upload
            onUploadComplete={onClose}
            images={state.images}
            categoryId={categoryId}
          />
        </StyledDialogContent>
      </Dialog>
    </Container>
  )
}
