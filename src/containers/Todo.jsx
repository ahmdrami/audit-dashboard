import React from 'react'
import { Drawer } from '@material-ui/core';

const Todo = ({ open, onCloseTodo }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onCloseTodo}
    >
     
    </Drawer>
  )
}

export default Todo
