import React, { useState } from 'react'
import Upload from '../containers/Upload'
import {
  Typography,
  Divider,
  Fab,
  Dialog,
  ListItem,
  ListItemText,
  List,
  Slide
} from '@material-ui/core'
import styled from 'styled-components'
import CloudIcon from '@material-ui/icons/CloudUploadRounded'
import AddIcon from '@material-ui/icons/AddCircleRounded'

function Transition(props) {
  return <Slide direction="up" {...props} />
}
const StyledDivider = styled(Divider)`
  && {
    margin: 2em 0;
  }
`

const StyledInput = styled.input`
  display: none;
`
const StyledFab = styled(Fab)`
  && {
    margin-right: 1em;
    svg {
      margin-right: 8px;
    }
  }
`
const getImages = files => {
  const imagesWithMeta = []
  Array.from(files).forEach(f => {
    imagesWithMeta.push({
      category: '',
      name: f.name,
      file: f
    })
  })
  return imagesWithMeta
}
const Audits = () => {
  const [state, setState] = useState(() => ({ open: false, images: [] }))

  const onInputFiles = ({ target }) => {
    if (target.files) {
      setState({ ...state, images: getImages(target.files), open: true })
      target.value = ''
    }
  }

  const onClose = () => setState({ ...state, open: false })
  return (
    <div>
      <Typography variant="h3">Audits</Typography>
      <StyledDivider />
      <StyledInput
        id="image-upload"
        accept="image/*"
        type="file"
        onChange={onInputFiles}
        multiple
      />

      <StyledFab size="large" variant="extended" color="primary">
        <AddIcon /> Add
      </StyledFab>
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

      <Dialog
        fullScreen
        open={state.open}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
        </List>

        <Upload images={state.images} />
      </Dialog>
    </div>
  )
}

export default Audits
