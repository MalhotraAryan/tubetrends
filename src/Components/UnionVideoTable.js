import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const UnionVideoTable = ({ videos }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Video ID</TableCell>
                        <TableCell align="right">View Count</TableCell>
                        <TableCell align="right">Trending Date</TableCell>
                        <TableCell align="right">Channel Title</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {videos.map((video, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {video.VideoID}
                            </TableCell>
                            <TableCell align="right">{video.ViewCount}</TableCell>
                            <TableCell align="right">{video.TrendingDate}</TableCell>
                            <TableCell align="right">{video.ChannelTitle}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UnionVideoTable;
