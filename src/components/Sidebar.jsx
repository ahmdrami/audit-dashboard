import React, { Fragment, useState, useEffect } from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Collapse
} from '@material-ui/core'
import styled from 'styled-components'
import SignIn from '../containers/SignIn'
import { fbAuth, db } from '../App'
import { navigate } from '@reach/router'
import { mapIds } from '../pages/Home'

const StyledDrawer = styled(Drawer)`
  && {
    > div {
      padding-top: 100px;
      width: 200px;
    }
  }
`

const Sidebar = ({ session }) => {
  const [open, setOpen] = useState(() => false)
  const [menu, setMenu] = useState(() => [])

  useEffect(() => {
    db.ref('menu').on('value', snapshot => {
      setMenu(mapIds(snapshot.val()))
      console.log(mapIds(snapshot.val()));
      
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

  const renderNav = m =>
    m.map(({ id, url, label, children }) => (
      <Fragment key={id}>
        <ListItem button onClick={onClick(url)}>
          <ListItemText inset primary={label}>
            {label}
          </ListItemText>
        </ListItem>
        <Divider />
        {children && (
          <Collapse in={true} timeout={1} unmountOnExit>
            <List component="div" disablePadding>
              {renderNav(children)}
            </List>
          </Collapse>
        )}
      </Fragment>
    ))
  return (
    <Fragment>
      <StyledDrawer variant="permanent">
        <List>
          {renderNav(menu)}
          <ListItem
            button
            key="login"
            onClick={onClick(session ? 'logout' : 'login')}
          >
            <ListItemText inset primary={session ? 'Logout' : 'Login'} />
          </ListItem>
        </List>
      </StyledDrawer>

      <SignIn open={open} onClose={onClose} />
    </Fragment>
  )
}

export default Sidebar
