import React from 'react'
import './App.css'
import { Router } from '@reach/router'
import Home from './pages/Home'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import { initializeApp, database } from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyAc11hLdsnaiU-oM10HMN7nZGSmoDu1xG0',
  authDomain: 'loot-audit-dashboard.firebaseapp.com',
  databaseURL: 'https://loot-audit-dashboard.firebaseio.com',
  projectId: 'loot-audit-dashboard',
  storageBucket: 'loot-audit-dashboard.appspot.com',
  messagingSenderId: '675604510519',
  appId: '1:675604510519:web:1ea7257a5d89504a'
}
initializeApp(firebaseConfig)

export const db = database()

function App() {
  return (
    <div>
      {/* <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Sidebar />
      <Main>
        <Router>
          <Home default />
        </Router>
      </Main>
    </div>
  )
}

export default App
