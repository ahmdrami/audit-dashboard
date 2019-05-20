import React, { useState, memo } from 'react'
import {
  Dialog,
  DialogContent,
  TextField,
  Fab,
  Typography
} from '@material-ui/core'
import { fbAuth } from '../App'

const SignIn = memo(({ open, onClose }) => {
  const [form, setForm] = useState(() => ({ email: '', password: '' }))

  const onChange = ({ currentTarget: { name, value } }) =>
    setForm(s => ({
      ...s,
      [name]: value
    }))

  const onLogin = async e => {
    e.preventDefault()
    try {
      await fbAuth().setPersistence(fbAuth.Auth.Persistence.SESSION)
      await fbAuth().signInWithEmailAndPassword(form.email, form.password)
      onClose()
    } catch (e) {
      console.log(e, 'error')
    }
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <Typography variant="h4">Login</Typography>
        <form onSubmit={onLogin}>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Email"
            value={form.emailemail}
            placeholder="example@loot.io"
            onChange={onChange}
            name="email"
            type="email"
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Password"
            value={form.password}
            placeholder="********"
            onChange={onChange}
            name="password"
            type="password"
          />

          <Fab
            onClick={onLogin}
            color="primary"
            variant="extended"
            type="submit"
          >
            Login
          </Fab>
        </form>
      </DialogContent>
    </Dialog>
  )
})

export default SignIn
