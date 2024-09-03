import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';

type TaxPayer = {
  tid: string;
  firstName: string;
  lastName: string;
  address: string;
};

type TaxPayerUpdateFormProps = {
  taxpayer: TaxPayer;
  onUpdateTaxPayer: (taxpayer: TaxPayer) => void;
  onCancel: () => void;
};

const TaxPayerUpdateForm: React.FC<TaxPayerUpdateFormProps> = ({ taxpayer, onUpdateTaxPayer, onCancel }) => {
  const { control, handleSubmit } = useForm<TaxPayer>({ defaultValues: taxpayer });

  const onSubmit = (data: TaxPayer) => {
    onUpdateTaxPayer(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Update TaxPayer
      </Typography>
      <Controller
        name="tid"
        control={control}
        rules={{ required: 'TID is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="TID"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error?.message}
            disabled
          />
        )}
      />
      <Controller
        name="firstName"
        control={control}
        rules={{ required: 'First Name is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="First Name"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        rules={{ required: 'Last Name is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Last Name"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      <Controller
        name="address"
        control={control}
        rules={{ required: 'Address is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Address"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button type="submit" variant="contained" color="primary">
          Update TaxPayer
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default TaxPayerUpdateForm;
