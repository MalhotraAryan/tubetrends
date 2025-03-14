import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import NoUserFound from '../Components/NoUserFound';
import EmptyQuery from '../Components/EmptyQuery';
import { useState, useEffect } from 'react';
import Query from '../Objects/Query';
import axios from 'axios';
import { SERVER_URL } from '../Utils/constants';

function History(props) {
    const [queries, setQueries] = useState([]);

    const getQueries = async () => {
        if (!props.user) {
            return;
        }
        try {


            const response = await axios.get(`${SERVER_URL}/query-history`, {
                params: {
                    UserName: props.user.UserName,
                    isFavorite: false,
                },
            });

            const res = [];
            console.log("Queries data:", response.data)
            for (const data of response.data) {
                const tmp = new Query(data);

                res.push(tmp)
            }
            setQueries(res);

        } catch (error) {
            console.log(error)
            setQueries([]);
        }
    }

    useEffect(() => {
        getQueries();
    }, []);
    if (!props.user) {
        return (<NoUserFound />);
    }

    if (queries.length === 0) {
        console.log("No queries")
        return (<EmptyQuery queryType="History" />);
    }

    return (
        <div>
            <TableContainer component={Paper} className='form'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>QueryID</TableCell>
                            <TableCell>VideoTitle</TableCell>
                            <TableCell>ChannelTitle</TableCell>
                            <TableCell>TrendingDate</TableCell>
                            <TableCell>Region</TableCell>
                            <TableCell>Tags</TableCell>
                            {queries[0].QueryTime && <TableCell>QueryTime</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {queries.map((query) => (
                            <TableRow key={query.QueryID}>
                                <TableCell>{query.QueryID}</TableCell>
                                <TableCell>{query.VideoTitle}</TableCell>
                                <TableCell>{query.ChannelTitle}</TableCell>
                                {query.TrendingDate && <TableCell>{query.TrendingDate.toLocaleString()}</TableCell>}
                                <TableCell>{query.Region}</TableCell>
                                <TableCell>{query.Tags.join(", ")}</TableCell>
                                {query.QueryTime && <TableCell>{query.QueryTime.toLocaleString()}</TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default History