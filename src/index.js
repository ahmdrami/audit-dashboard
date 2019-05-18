import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import rootReducer from './store'
import { CssBaseline } from '@material-ui/core'

const rootEl = document.getElementById('root')

const store = createStore(rootReducer)
ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>,
  rootEl
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

// if (module.hot) {
//   module.hot.accept('./App', () => {
//     const NextApp = require('./App').default
//     ReactDOM.render(<NextApp />, rootEl)
//   })
// }
