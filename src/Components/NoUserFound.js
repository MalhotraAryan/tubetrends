import React from 'react';
import { Box, Typography } from '@mui/material';

const NoUserFound = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                gap: 2,
            }}
        >
            <Typography variant="h4" color="error">
                No User Found
            </Typography>
            <Typography variant="body1">
                Please Sign Up or Sign In.
            </Typography>
        </Box>
    );
};

export default NoUserFound;
