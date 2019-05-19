import React, { useState, memo } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button
} from '@material-ui/core'
import { fbAuth } from '../App'

const SignIn = memo(({ open, onClose }) => {
  const [form, setForm] = useState(() => ({ email: '', password: '' }))

  const onChange = ({ currentTarget: { name, value } }) =>
    setForm({
      ...form,
      [name]: value
    })

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
      <DialogTitle id="alert-dialog-title">Login</DialogTitle>
      <DialogContent>
        <form onSubmit={onLogin}>
          <TextField
            fullWidth
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
            margin="normal"
            label="Password"
            value={form.password}
            placeholder="********"
            onChange={onChange}
            name="password"
            type="password"
          />

          <Button
            fullWidth
            onClick={onLogin}
            color="primary"
            variant="contained"
            type="submit"
          >
            Login
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
})

export default SignIn
