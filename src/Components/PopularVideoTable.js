import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


function PopularVideoTable({ data }) {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="video list">
                <TableHead>
                    <TableRow>
                        <TableCell>Video ID</TableCell>
                        <TableCell>Video Title</TableCell>
                        <TableCell>Channel Title</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.VideoID}>
                            <TableCell component="th" scope="row">
                                {row.VideoID}
                            </TableCell>
                            <TableCell>{row.VideoTitle}</TableCell>
                            <TableCell>{row.ChannelTitle}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default PopularVideoTable;
