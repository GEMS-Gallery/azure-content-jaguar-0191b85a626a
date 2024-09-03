import React, { useState } from 'react';
import { TextField, Box, Typography, IconButton } from '@mui/material';
import DataTable, { TableColumn } from 'react-data-table-component';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type TaxPayer = {
  tid: string;
  firstName: string;
  lastName: string;
  address: string;
};

type TaxPayerListProps = {
  taxpayers: TaxPayer[];
  onEditTaxPayer: (taxpayer: TaxPayer) => void;
  onDeleteTaxPayer: (tid: string) => void;
};

const TaxPayerList: React.FC<TaxPayerListProps> = ({ taxpayers, onEditTaxPayer, onDeleteTaxPayer }) => {
  const [filterText, setFilterText] = useState('');

  const columns: TableColumn<TaxPayer>[] = [
    {
      name: 'TID',
      selector: row => row.tid,
      sortable: true,
    },
    {
      name: 'First Name',
      selector: row => row.firstName,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: row => row.lastName,
      sortable: true,
    },
    {
      name: 'Address',
      selector: row => row.address,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <IconButton onClick={() => onEditTaxPayer(row)} size="small">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDeleteTaxPayer(row.tid)} size="small" color="error">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const filteredItems = taxpayers.filter(
    item => item.tid.toLowerCase().includes(filterText.toLowerCase()) ||
           item.firstName.toLowerCase().includes(filterText.toLowerCase()) ||
           item.lastName.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        TaxPayer Records
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Search by TID, First Name, or Last Name"
        value={filterText}
        onChange={e => setFilterText(e.target.value)}
        sx={{ mb: 2 }}
      />
      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
        highlightOnHover
        pointerOnHover
        responsive
      />
    </Box>
  );
};

export default TaxPayerList;
