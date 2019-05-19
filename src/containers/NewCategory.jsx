import React from 'react'
import { TextField, Button } from '@material-ui/core'

export default function NewCategory({ onChange, category, onSave }) {
  return (
    <form onSubmit={onSave}>
      <TextField
        name="label"
        margin="normal"
        fullWidth
        label="Name"
        value={category.label}
        onChange={onChange}
      />
      <TextField
        name="url"
        margin="normal"
        fullWidth
        placeholder="e.g. dashboard"
        helperText="Must be lower-case with no space"
        label="Url"
        value={category.url}
        onChange={onChange}
      />

      <Button type="submit" color="primary" variant="contained">
        {category.id ? 'Update' : 'Save '}
      </Button>
    </form>
  )
}
