import React, { useState } from 'react'
import styled from 'styled-components'
import { StyledFab, Transition } from './Audits'
import CloudIcon from '@material-ui/icons/CloudUploadRounded'
import { Dialog, DialogContent } from '@material-ui/core'
import Upload from '../containers/Upload'

const StyledInput = styled.input`
  display: none;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const getImages = files => Array.from(files)

export default function SingleAudit({ categoryId }) {
  const [state, setState] = useState(() => ({
    images: [],
    open: false
  }))

  const onInputFiles = ({ target }) => {
    if (target.files) {
      setState({ images: getImages(target.files), open: true })
      target.value = ''
    }
  }

  const onClose = () => setState({ ...state, open: false })
  return (
    <Container>
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
          <CloudIcon /> Upload
        </StyledFab>
      </label>
    {categoryId}
     
      <Dialog
        open={state.open}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <DialogContent>
          <Upload images={state.images} categoryId={categoryId} />
        </DialogContent>
      </Dialog>
    </Container>
  )
}
