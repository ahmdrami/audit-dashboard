import React, { useState, useEffect, Fragment, memo } from 'react'
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  TextField,
  Divider
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/DeleteRounded'
import AddIcon from '@material-ui/icons/AddCircle'
import styled from 'styled-components'
import { db } from '../App'
import { mapIds } from '../pages/Home'

const StyledPaper = styled(Paper)`
  && {
    margin: 1%;
    padding: 2em;
    h6 {
      margin-bottom: 1em;
    }
  }
`
const Form = styled.form`
  display: flex;
  align-items: center;
  button {
    margin-left: 8px;
  }
`
const DeleteButton = styled(IconButton)`
  svg {
    fill: red;
  }
`
const StyledList = styled(List)`
  margin-top: 1em;
`
const Todo = memo(({ session }) => {
  const [todoDbRef] = useState(() => db)
  const [state, setState] = useState(() => ({
    todos: [],
    todo: ''
  }))

  useEffect(() => {
    db.ref('todos').on('value', snapshot =>
      setState(s => ({ ...s, todos: mapIds(snapshot.val()) }))
    )
  }, [])

  const onChange = ({ currentTarget: { value } }) =>
    setState(s => ({ ...s, todo: value }))

  const onSubmit = e => {
    e.preventDefault()
    const { todo } = state

    if (todo) {
      todoDbRef.ref('todos').push({ name: todo })
    }
  }

  const onDelete = id => () => todoDbRef.ref(`todos/${id}`).remove(null)

  return (
    <StyledPaper elevation={1}>
      <Typography variant="h6">In Progress</Typography>

      {session && (
        <Form onSubmit={onSubmit}>
          <TextField
            onChange={onChange}
            value={state.todo}
            fullWidth
            color="primary"
            placeholder="Insert todo"
          />
          <IconButton color="primary" aria-label="Add">
            <AddIcon />
          </IconButton>
        </Form>
      )}

      <StyledList>
        {state.todos.map(({ id, name }) => (
          <Fragment key={id}>
            <ListItem>
              <ListItemText primary={name} />
              {session && (
                <ListItemSecondaryAction>
                  <DeleteButton onClick={onDelete(id)}>
                    <DeleteIcon />
                  </DeleteButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
            <Divider />
          </Fragment>
        ))}
      </StyledList>
    </StyledPaper>
  )
})

export default Todo
