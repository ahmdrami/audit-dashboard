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
import { db } from '../App'
import { navigate } from '@reach/router'
import { mapIds } from '../pages/Home'
import {
  FiberManualRecordRounded,
  FiberSmartRecordRounded
} from '@material-ui/icons'
import { ReactComponent as Logo } from '../assets/logo.svg'
const StyledDrawer = styled(Drawer)`
  && {
    > div {
      width: 200px;
    }

    .logo {
      margin: 2em 0;
      height: 56px;
    }
  }
`
const StyledListItem = styled(ListItem)`
  && {
    ${({ nested }) => nested === 'PAD' && `padding-left: 2em;`}
  }
`

const Sidebar = memo(props => {
  const [menu, setMenu] = useState(() => [])

  useEffect(() => {
    db.ref('menu').on('value', snapshot => {
      setMenu(mapIds(snapshot.val()))
    })
  }, [])

  const onClick = url => () => navigate(url)

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
        <Logo className="logo" />
        <List component="nav">{renderNav(menu)}</List>
      </StyledDrawer>
    </>
  )
})

export default Sidebar
