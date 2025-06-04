// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2f66ab',
    },
    secondary: {
      main: '#e7a113', // Optional highlight color
    },
  },
  typography: {
    fontFamily: 'PT Serif, serif',
    h6: {   
      fontWeight: 600,
      letterSpacing: 1,
    },
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 64,
          '@media (max-width:600px)': {
            minHeight: 56,
          },
        },
      },
    },
  },
});

export default theme;
