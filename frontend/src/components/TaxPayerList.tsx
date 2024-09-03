import React, { useState } from 'react';
import { TextField, Box, Typography } from '@mui/material';
import DataTable, { TableColumn } from 'react-data-table-component';

type TaxPayer = {
  tid: string;
  firstName: string;
  lastName: string;
  address: string;
};

type TaxPayerListProps = {
  taxpayers: TaxPayer[];
};

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
];

const TaxPayerList: React.FC<TaxPayerListProps> = ({ taxpayers }) => {
  const [filterText, setFilterText] = useState('');

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
