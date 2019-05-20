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
      margin-left: 8px;
      svg {
        margin-right: 8px;
      }
    }
  }
`
const LeftButtonContainer = styled.div`
  margin-left: auto;
`
const Appbar = ({ session, toggleTodo }) => {
  const [open, setOpen] = useState(() => false)

  const onLogin = () => {
    return session ? fbAuth().signOut() : setOpen(true)
  }

  return (
    <>
      <StyledAppBar position="fixed" color="secondary">
        <Toolbar>
          <LeftButtonContainer>
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
          </LeftButtonContainer>
        </Toolbar>
      </StyledAppBar>
      <SignIn open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default Appbar
