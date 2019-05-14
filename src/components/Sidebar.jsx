import React from 'react'
import PropTypes from 'prop-types'
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core'
import styled from 'styled-components'

const StyledDrawer = styled(Drawer)`
  && {
    > div {
      width: 200px;
    }
  }
`
const Sidebar = props => {
  return (
    <StyledDrawer variant="permanent">
      <List>
        {['Home', 'Starred'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  )
}

Sidebar.propTypes = {}

export default Sidebar
