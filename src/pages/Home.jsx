import React, { useState, useEffect, Fragment } from 'react'
import { Typography, Avatar, Button, Fab } from '@material-ui/core'
import MaterialCard from '../components/Card'
import AddCircle from '@material-ui/icons/AddRounded'
import styled from 'styled-components'
import NewAudit from '../components/NewAudit'
import { db } from '../App'
import Header from '../components/Header'
import { calculateAverage } from '../utils'
import Todo from '../containers/Todo'

const Audit = {
  score: 0,
  title: '',
  description: ''
}
const AddButton = styled(Fab)`
  && {
    position: fixed;
    bottom: 4em;
    right: 4em;
    svg {
      width: 2em;
      height: 2em;
    }
  }
`
const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`
export const mapIds = data =>
  (data &&
    Object.keys(data).map(key => {
      const isChildren = Object.keys(data[key]).includes('children')
      return {
        id: key,
        ...data[key],
        ...(isChildren && { children: mapIds(data[key].children) })
      }
    })) ||
  []

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

const Home = ({ session, children }) => {
  const [state, setState] = useState(() => ({
    open: false,
    audit: Audit,
    audits: [],
    fetching: false
  }))
  const [auditDb] = useState(() => db)

  useEffect(() => {
    auditDb
      .ref('audits')
      .on('value', snapshot =>
        setState(s => ({ ...s, audits: mapIds(snapshot.val()) }))
      )
  }, [auditDb])

  const onChange = ({ currentTarget: { name, value } }) =>
    setState(s => ({
      ...s,
      audit: {
        ...s.audit,
        [name]: value
      }
    }))
  const onSave = () => {
    const { audit } = state
    if (!audit.id) {
      auditDb.ref('audits').push(audit)
    } else {
      const { id, title, score, description } = audit
      auditDb.ref(`audits/${id}`).update({ title, score, description })
    }
    toggleModal(false)
  }

  const toggleModal = state => setState(s => ({ ...s, open: state }))
  const onEdit = id => () => {
    setState(s => ({
      ...s,
      audit: s.audits.find(audit => audit.id === id),
      open: true
    }))
  }
  const onDelete = id => () => {
    auditDb.ref(`audits/${id}`).remove(null)
  }

  const newModal = () => setState(s => ({ ...s, open: true, audit: Audit }))
  return (
    <>
      <Header
        title="Design audit board"
        subtitle={`Score: ${calculateAverage(state.audits)}`}
      />
      <CardContainer>
        {state.audits.map(({ id, score, title, description }) => (
          <MaterialCard key={id}>
            <Score>{score}</Score>
            <Typography align="center" variant="h5">
              {title}
            </Typography>
            <Typography align="center" variant="caption">
              {description}
            </Typography>
            {session && (
              <ButtonContainer>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={onDelete(id)}
                >
                  Delete
                </Button>
                <Button color="primary" variant="outlined" onClick={onEdit(id)}>
                  Edit
                </Button>
              </ButtonContainer>
            )}
          </MaterialCard>
        ))}
      </CardContainer>
      <Todo session={session} />
      {session && (
        <Fragment>
          <AddButton color="primary" onClick={newModal}>
            <AddCircle />
          </AddButton>
          <NewAudit
            open={state.open}
            onSave={onSave}
            onChange={onChange}
            onClose={() => toggleModal(false)}
            audit={state.audit}
          />
        </Fragment>
      )}
    </>
  )
}

export default Home
