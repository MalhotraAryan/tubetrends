import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function TrendingTagsTable(props) {
    const dataList = props.data;
    return (
        <TableContainer component={Paper}>
            <Table aria-label="trending tags data">
                <TableHead>
                    <TableRow>
                        <TableCell>Tag</TableCell>
                        <TableCell align="right">View Count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataList.map((data, index) => (
                        <TableRow key={data.Tag}>
                            <TableCell component="th" scope="row">
                                {data.Tag}
                            </TableCell>
                            <TableCell align="right">{data.ViewCount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TrendingTagsTable;
