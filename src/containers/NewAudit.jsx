import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField
} from '@material-ui/core'

const NewAudit = ({ audit, open, onClose, onChange, onSave }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {audit.id ? 'Edit audit' : 'Create a new entry'}
      </DialogTitle>
      <DialogContent>
        <TextField
          name="score"
          margin="normal"
          fullWidth
          label="Score"
          value={audit.score}
          onChange={onChange}
        />
        <TextField
          name="title"
          margin="normal"
          fullWidth
          label="Title"
          value={audit.title}
          onChange={onChange}
        />
        <TextField
          name="description"
          margin="normal"
          fullWidth
          multiline
          rowsMax="4"
          label="Description"
          value={audit.description}
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary" variant="contained" autoFocus>
          {audit.id ? 'Update' : 'Save '}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewAudit
