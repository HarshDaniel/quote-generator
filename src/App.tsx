import React, { useState, useEffect } from 'react';
import { Button, Typography, createTheme, ThemeProvider, Container, Paper, Box } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976D2',
    },
    background: {
      default: '#121212',
    },
  },
});

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: darkTheme.palette.background.default,
  color: darkTheme.palette.getContrastText(darkTheme.palette.background.default),
  padding: darkTheme.spacing(4),
};

const quoteContainerStyle = {
  textAlign: 'center',
  padding: darkTheme.spacing(3),
  backgroundColor: darkTheme.palette.background.paper,
  borderRadius: darkTheme.shape.borderRadius,
  boxShadow: darkTheme.shadows[5],
  maxWidth: '600px',
};

const buttonStyle = {
  marginTop: darkTheme.spacing(2),
};

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  async function fetchQuote() {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.log("Error while fetching the quote:", error);
    }
  }

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="sm">
        <Box sx={containerStyle}>
          <Typography variant="h2" gutterBottom>
            Quote Generator
          </Typography>

          <Paper sx={quoteContainerStyle}>
            <Typography variant="h4">{quote}</Typography>
            <Typography variant="h6">- {author}</Typography>
          </Paper>

          <Button
            variant="contained"
            color="primary"
            onClick={fetchQuote}
            sx={buttonStyle}
          >
            Next
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
