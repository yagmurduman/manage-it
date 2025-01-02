import * as React from 'react';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function PaymentFail() {
  return (
    <div>
      <LinearProgress color="primary" />
      <Alert action={
        <Link to="/">
        <Button color="error" variant="contained" size="small" sx={{mr: 3, mt: 1}}><strong>Return to Home</strong></Button>
        </Link>
      }
        severity="danger" color="error" sx={{
        fontSize: 25,
        width: "100%",
        
      }}>
        <strong>Checkout failed!</strong>
      </Alert>
      <LinearProgress sx={{mb: 10}} color="primary" />
    </div>
  );
}
