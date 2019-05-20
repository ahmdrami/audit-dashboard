import React, { memo } from 'react'
import { TextField, Button } from '@material-ui/core'

const NewCategory = memo(({ onChange, category, onSave }) => {
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

      <Button disabled={category.label < 3} type="submit" color="primary" variant="contained">
        {category.id ? 'Update' : 'Save '}
      </Button>
    </form>
  )
})

export default NewCategory
