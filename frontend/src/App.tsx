import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Snackbar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TaxPayerForm from './components/TaxPayerForm';
import TaxPayerList from './components/TaxPayerList';
import TaxPayerUpdateForm from './components/TaxPayerUpdateForm';
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
  const [editingTaxpayer, setEditingTaxpayer] = useState<TaxPayer | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

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
        setSnackbar({ open: true, message: 'TaxPayer added successfully' });
      } else {
        setSnackbar({ open: true, message: `Error adding taxpayer: ${result.err}` });
      }
    } catch (error) {
      console.error('Error adding taxpayer:', error);
      setSnackbar({ open: true, message: 'Error adding taxpayer' });
    }
    setLoading(false);
  };

  const handleUpdateTaxPayer = async (updatedTaxPayer: TaxPayer) => {
    setLoading(true);
    try {
      const result = await backend.updateTaxPayer(updatedTaxPayer);
      if ('ok' in result) {
        await fetchTaxPayers();
        setSnackbar({ open: true, message: 'TaxPayer updated successfully' });
      } else {
        setSnackbar({ open: true, message: `Error updating taxpayer: ${result.err}` });
      }
    } catch (error) {
      console.error('Error updating taxpayer:', error);
      setSnackbar({ open: true, message: 'Error updating taxpayer' });
    }
    setLoading(false);
    setEditingTaxpayer(null);
  };

  const handleDeleteTaxPayer = async (tid: string) => {
    setLoading(true);
    try {
      const result = await backend.deleteTaxPayer(tid);
      if ('ok' in result) {
        await fetchTaxPayers();
        setSnackbar({ open: true, message: 'TaxPayer deleted successfully' });
      } else {
        setSnackbar({ open: true, message: `Error deleting taxpayer: ${result.err}` });
      }
    } catch (error) {
      console.error('Error deleting taxpayer:', error);
      setSnackbar({ open: true, message: 'Error deleting taxpayer' });
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
              {editingTaxpayer ? (
                <TaxPayerUpdateForm
                  taxpayer={editingTaxpayer}
                  onUpdateTaxPayer={handleUpdateTaxPayer}
                  onCancel={() => setEditingTaxpayer(null)}
                />
              ) : (
                <TaxPayerForm onAddTaxPayer={handleAddTaxPayer} />
              )}
            </Box>
            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
              {loading ? (
                <CircularProgress />
              ) : (
                <TaxPayerList
                  taxpayers={taxpayers}
                  onEditTaxPayer={setEditingTaxpayer}
                  onDeleteTaxPayer={handleDeleteTaxPayer}
                />
              )}
            </Box>
          </Box>
        </Box>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
