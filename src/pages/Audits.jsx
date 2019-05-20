import React, { useState } from 'react'
import { Fab, Dialog, Slide, DialogContent } from '@material-ui/core'
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/AddCircleRounded'
import { db } from '../App'
import NewCategory from '../components/NewCategory'
import Header from '../components/Header'

export function Transition(props) {
  return <Slide direction="up" {...props} />
}

export const StyledFab = styled(Fab)`
  && {
    margin-right: 1em;
    svg {
      margin-right: 8px;
    }
  }
`

const initialCategory = { label: '', url: '' }
const Audits = ({ children, session }) => {
  const [open, setOpen] = useState(() => false)
  const [menuDbRef] = useState(() =>
    db.ref('menu/-LervsfjygCjfJ2mRFRB/children')
  )

  const [category, setCategory] = useState(() => initialCategory)

  const onChange = ({ currentTarget: {value } }) =>
    setCategory(() => ({ label: value, url: `/audits/${value.replace(/ /g, '-').toLowerCase()}`  }))

  const onClose = () => setOpen(false)
  const onClick = () => setOpen(true)

  const onSave = e => {
    e.preventDefault()
    if (!category.id) {
      menuDbRef.push(category)
    }

    setCategory(initialCategory)
    setOpen(false)
  }
  return (
    <>
      <Header title="Audits">
        {session && (
          <StyledFab
            onClick={onClick}
            size="large"
            variant="extended"
            color="primary"
          >
            <AddIcon /> Add Category
          </StyledFab>
        )}
      </Header>

      {children}
      <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
        <DialogContent>
          <NewCategory
            onSave={onSave}
            onChange={onChange}
            category={category}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Audits
