import React, { Fragment, useState, useEffect, memo } from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon
} from '@material-ui/core'
import styled from 'styled-components'
import SignIn from '../containers/SignIn'
import { fbAuth, db } from '../App'
import { navigate } from '@reach/router'
import { mapIds } from '../pages/Home'
import {
  LockRounded,
  LockOpenRounded,
  FiberManualRecordRounded,
  FiberSmartRecordRounded
} from '@material-ui/icons'

const StyledDrawer = styled(Drawer)`
  && {
    > div {
      padding-top: 100px;
      width: 200px;
    }
  }
`
const StyledListItem = styled(ListItem)`
  && {
    ${({ nested }) => nested === 'PAD' && `padding-left: 2em;`}
  }
`

const Sidebar = memo(({ session }) => {
  const [open, setOpen] = useState(() => false)
  const [menu, setMenu] = useState(() => [])

  useEffect(() => {
    db.ref('menu').on('value', snapshot => {
      setMenu(mapIds(snapshot.val()))
    })
  }, [])
  const onClose = () => setOpen(false)

  const onClick = url => () => {
    if (url === 'login') {
      return setOpen(true)
    }
    if (url === 'logout') {
      return fbAuth().signOut()
    }

    return navigate(url)
  }

  const renderNav = (m, nested = false) =>
    m.map(({ id, url, label, children }) => (
      <Fragment key={id}>
        <StyledListItem
          nested={nested ? 'PAD' : ''}
          button
          onClick={onClick(url)}
        >
          <ListItemIcon>
            {nested ? (
              <FiberSmartRecordRounded />
            ) : (
              <FiberManualRecordRounded />
            )}
          </ListItemIcon>
          <ListItemText inset primary={label}>
            {label}
          </ListItemText>
        </StyledListItem>
        {children && (
          <Collapse in={true} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderNav(children, true)}
            </List>
          </Collapse>
        )}
      </Fragment>
    ))
  return (
    <>
      <StyledDrawer variant="permanent">
        <List component="nav">
          {renderNav(menu)}
          <ListItem
            button
            key="login"
            onClick={onClick(session ? 'logout' : 'login')}
          >
            <ListItemIcon>
              {session ? <LockOpenRounded /> : <LockRounded />}
            </ListItemIcon>
            <ListItemText inset primary={session ? 'Logout' : 'Login'} />
          </ListItem>
        </List>
      </StyledDrawer>

      <SignIn open={open} onClose={onClose} />
    </>
  )
})

export default Sidebar
