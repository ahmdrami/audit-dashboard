import React, { memo } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@material-ui/core'

const NewAudit = memo(({ audit, open, onClose, onChange, onSave }) => {
  const { id, score, title, description } = audit
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {id ? 'Edit audit' : 'Create a new entry'}
      </DialogTitle>
      <DialogContent>
        <TextField
          name="score"
          margin="normal"
          fullWidth
          label="Score"
          value={score}
          onChange={onChange}
        />
        <TextField
          name="title"
          margin="normal"
          fullWidth
          label="Title"
          value={title}
          onChange={onChange}
        />
        <TextField
          name="description"
          margin="normal"
          fullWidth
          multiline
          rowsMax="4"
          label="Description"
          value={description}
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={onSave}
          color="primary"
          variant="contained"
          disabled={!score || !title || !description}
          autoFocus
        >
          {id ? 'Update' : 'Save '}
        </Button>
      </DialogActions>
    </Dialog>
  )
})

export default NewAudit
