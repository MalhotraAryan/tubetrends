import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const EmptyFavoritesBox = (props) => {
    return (
        <Box
            textAlign="center"
            padding={4}
            bgcolor="primary.main"
            borderRadius="borderRadius"
            color="common.white"
            {...props}
        >
            {props.children}
        </Box>
    );
};

const EmptyQuery = (props) => {
    console.log('props', props);
    return (
        <EmptyFavoritesBox>
            <Typography variant="h5" component="div">
                There are no queries in your {props.queryType === 'Favorites' ? 'Favorites' : 'History'}.
            </Typography>
        </EmptyFavoritesBox>
    );
};

export default EmptyQuery;
