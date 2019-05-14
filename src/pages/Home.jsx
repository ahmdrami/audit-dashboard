import React, { useState, Fragment, useEffect, memo } from 'react'
import { IconButton, Typography, Avatar, Button } from '@material-ui/core'
import MaterialCard from '../components/Card'
import AddCircle from '@material-ui/icons/AddCircleRounded'
import styled from 'styled-components'
import NewAudit from '../containers/NewAudit'
import { db } from '../App'

const Audit = {
  score: 0,
  title: '',
  description: ''
}
const AddButton = styled(IconButton)`
  && {
    svg {
      width: 2em;
      height: 2em;
    }
  }
`
const CardContainer = styled.div`
  display: flex;
`
const mapIds = audits =>
  Object.keys(audits).map(key => {
    return {
      id: key,
      ...audits[key]
    }
  })

const Score = styled(Avatar)`
  && {
    font-size: 2em;
    height: 60px;
    width: 60px;
    margin-bottom: 15px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 1em;
  justify-content: center;

  button:first-child {
    margin-right: 12px;
  }
`

const Home = () => {
  const [open, setOpen] = useState(() => false)
  const [auditDb] = useState(() => db.ref('audits'))
  const [audit, setAudit] = useState(() => Audit)
  const [audits, setAudits] = useState(() => [])

  useEffect(() => {
    auditDb.on('value', snapshot => setAudits(mapIds(snapshot.val())))
  }, [auditDb])

  const onChange = ({ currentTarget: { name, value } }) =>
    setAudit({
      ...audit,
      [name]: value
    })
  const onSave = () => {
    if (!audit.id) {
      auditDb.push(audit)
    } else {
      const { id, title, score, description } = audit
      db.ref(`audits/${id}`).update({ title, score, description })
    }
    setOpen(false)
  }

  const onEdit = id => () => {
    setAudit(audits.find(audit => audit.id === id))
    setOpen(true)
  }
  const onDelete = id => () => {
    db.ref(`audits/${id}`).remove(null)
  }
  return (
    <Fragment>
      <CardContainer>
        {audits.map(({ id, score, title, description }) => (
          <MaterialCard key={id}>
            <Score>{score}</Score>
            <Typography variant="h5">{title}</Typography>
            <Typography align="center" variant="caption">
              {description}
            </Typography>
            <ButtonContainer>
              <Button color="primary" variant="outlined" onClick={onDelete(id)}>
                Delete
              </Button>
              <Button color="primary" variant="outlined" onClick={onEdit(id)}>
                Edit
              </Button>
            </ButtonContainer>
          </MaterialCard>
        ))}
        <MaterialCard>
          <AddButton onClick={() => setOpen(true)}>
            <AddCircle />
          </AddButton>
          <Typography variant="h6">NEW</Typography>
        </MaterialCard>
      </CardContainer>

      <NewAudit
        open={open}
        onSave={onSave}
        onChange={onChange}
        onClose={() => setOpen(false)}
        audit={audit}
      />
    </Fragment>
  )
}

export default Home
