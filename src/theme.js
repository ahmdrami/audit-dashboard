import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: '#00d8d4'
    },
    secondary: { main: '#1b2243' },
    error: { main: '#f65031' }
  },
  overrides: {
    MuiInput: {
      underline: {
        '&:after': {
          borderBottomColor: '#00d8d4'
        }
      }
    }
  }
})

export default theme
