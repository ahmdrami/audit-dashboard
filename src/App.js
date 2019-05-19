import React, { useEffect, useState } from 'react'
import { Router } from '@reach/router'
import Home from './pages/Home'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'
import Audits from './pages/Audits'
import SingleAudit from './pages/SingleAudit'
import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import theme from './theme'
import Appbar from './components/Appbar'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
}
firebase.initializeApp(firebaseConfig)

export const db = firebase.database()
export const fbAuth = firebase.auth
firebase.storage().ref().constructor.prototype.putFiles = function(
  files,
  folder
) {
  var ref = this
  return Promise.all(
    files.map(function(file) {
      return ref.child(`${folder}/${file.name}`).put(file)
    })
  )
}

export const fbStorage = firebase.storage()

function App() {
  const [session, setSession] = useState(() => false)

  useEffect(() => {
    fbAuth().onAuthStateChanged(user =>
      user ? setSession(true) : setSession(false)
    )
  }, [])
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Appbar session={session}/>
      <Sidebar session={session} />
      <Main>
        <Router>
          <Home default session={session} />
          <Audits path="audits" session={session}>
            <SingleAudit path=":categoryId" session={session} />
          </Audits>
        </Router>
      </Main>
    </MuiThemeProvider>
  )
}

export default App
