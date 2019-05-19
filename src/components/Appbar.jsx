import React, { useState } from 'react'
import { AppBar, Toolbar, Fab } from '@material-ui/core'
import styled from 'styled-components'
import { LockRounded, LockOpenRounded } from '@material-ui/icons'
import { fbAuth } from '../App'
import SignIn from '../containers/SignIn'

const StyledAppBar = styled(AppBar)`
  && {
    padding-left: 200px;

    button {
      margin-left: auto;
      svg {
        margin-right: 8px;
      }
    }
  }
`
const Appbar = ({ session }) => {
  const [open, setOpen] = useState(() => false)

  const onLogin = () => {
    return session ? fbAuth().signOut() : setOpen(true)
  }

  return (
    <>
      <StyledAppBar position="fixed" color="secondary">
        <Toolbar>
          <Fab
            size="medium"
            variant="extended"
            onClick={onLogin}
            color="primary"
          >
            {session ? (
              <>
                <LockRounded /> Logout
              </>
            ) : (
              <>
                <LockOpenRounded /> Login
              </>
            )}
          </Fab>
        </Toolbar>
      </StyledAppBar>
      <SignIn open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default Appbar
