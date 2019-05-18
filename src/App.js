import React, { useEffect, useState, Fragment } from 'react'
import { Router } from '@reach/router'
import Home from './pages/Home'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import { initializeApp, database, auth, storage } from 'firebase'
import Audits from './pages/Audits';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
}
initializeApp(firebaseConfig)

export const db = database()
export const fbAuth = auth
export const fbStorage = storage()

function App() {
  const [session, setSession] = useState(() => false)

  useEffect(() => {
    fbAuth().onAuthStateChanged(user =>
      user ? setSession(true) : setSession(false)
    )
  }, [])
  return (
    <Fragment>
      <Sidebar session={session} />
      <Main>
        <Router>
          <Home default session={session} />
          <Audits path="/audits"  session={session} >
            <Audits default/>
            
          </Audits>
        </Router>
      </Main>
    </Fragment>
  )
}

export default App
