import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TaxPayerForm from './components/TaxPayerForm';
import TaxPayerList from './components/TaxPayerList';
import { backend } from 'declarations/backend';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3498db',
    },
    secondary: {
      main: '#2c3e50',
    },
    error: {
      main: '#e74c3c',
    },
  },
});

type TaxPayer = {
  tid: string;
  firstName: string;
  lastName: string;
  address: string;
};

function App() {
  const [taxpayers, setTaxpayers] = useState<TaxPayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTaxPayers();
  }, []);

  const fetchTaxPayers = async () => {
    try {
      const result = await backend.getAllTaxPayers();
      setTaxpayers(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching taxpayers:', error);
      setLoading(false);
    }
  };

  const handleAddTaxPayer = async (newTaxPayer: TaxPayer) => {
    setLoading(true);
    try {
      const result = await backend.createTaxPayer(newTaxPayer);
      if ('ok' in result) {
        await fetchTaxPayers();
      } else {
        console.error('Error adding taxpayer:', result.err);
      }
    } catch (error) {
      console.error('Error adding taxpayer:', error);
    }
    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            TaxPayer Management System
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Box sx={{ width: { xs: '100%', md: '45%' } }}>
              <TaxPayerForm onAddTaxPayer={handleAddTaxPayer} />
            </Box>
            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
              {loading ? (
                <CircularProgress />
              ) : (
                <TaxPayerList taxpayers={taxpayers} />
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
