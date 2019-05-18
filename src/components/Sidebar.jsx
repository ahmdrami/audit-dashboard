import React, { Fragment, useState } from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@material-ui/core'
import styled from 'styled-components'
import SignIn from '../containers/SignIn'
import { fbAuth } from '../App'
import { navigate } from '@reach/router'

const StyledDrawer = styled(Drawer)`
  && {
    > div {
      width: 200px;
    }
  }
`
const Menu = [
  {
    url: '/',
    label: 'Home',
    id: 1
  },
  {
    url: '/audits',
    label: 'Audits',
    id: 2
  }
]

const Sidebar = ({ session }) => {
  const [open, setOpen] = useState(() => false)
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
    m.map(({ id, url, label }) => (
      <Fragment key={id}>
        <ListItem button onClick={onClick(url)}>
          <ListItemText inset primary={label}>
            {label}
          </ListItemText>
        </ListItem>
        <Divider />
      </Fragment>
    ))
  return (
    <Fragment>
      <StyledDrawer variant="permanent">
        <List>
          {renderNav(Menu)}
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
