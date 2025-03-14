import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

const GroupVideoTable = ({ videos }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Channel Title</TableCell>
                        <TableCell align="right">Average Likes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {videos.map((video, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {video.ChannelTitle}
                            </TableCell>
                            <TableCell align="right">{video.AvgLikes}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default GroupVideoTable;
