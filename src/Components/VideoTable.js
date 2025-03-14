// import React, { Component } from 'react'
// import VideoRow from './VideoRow'

// // export default class VideoTable extends Component {
// //     render() {
// //         const videos = this.props.videos;
// //         console.log(typeof this.props.videos)
// //         return (
// //             <div>
// //                 {videos.map((video) => {
// //                     return <h3>Video</h3>
// //                     // return <VideoRow video={video} key={video.VideoID} />
// //                 })}
// //             </div>
// //         )
// //     }


// // }

// // style this component centrally
// import { styled } from '@mui/material/styles';
// import MuiTableCell from '@mui/material/TableCell';
// import MuiTableRow from '@mui/material/TableRow';

// export const StyledTableCell = styled(MuiTableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//         backgroundColor: theme.palette.common.black,
//         color: theme.palette.common.white,
//     },
//     [`&.${tableCellClasses.body}`]: {
//         fontSize: 14,
//     },
// }));

// export const StyledTableRow = styled(MuiTableRow)(({ theme }) => ({
//     '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.action.hover,
//     },
//     // hide last border
//     '&:last-child td, &:last-child th': {
//         border: 0,
//     },
// }));

// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// // import { StyledTableCell, StyledTableRow } from './StyledTable';
// export default class VideoTable extends Component {
//     render() {
//         const videos = this.props.videos;
//         console.log(typeof this.props.videos)
//         return (
//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 700 }} aria-label="customized table">
//                     <TableHead>
//                         <TableRow>
//                             <StyledTableCell>Video ID</StyledTableCell>
//                             <StyledTableCell align="right">Title</StyledTableCell>
//                             <StyledTableCell align="right">Channel ID</StyledTableCell>
//                             <StyledTableCell align="right">Published Date</StyledTableCell>
//                             <StyledTableCell align="right">Category ID</StyledTableCell>
//                             <StyledTableCell align="right">Tags</StyledTableCell>
//                             <StyledTableCell align="right">View Count</StyledTableCell>
//                             <StyledTableCell align="right">Like Count</StyledTableCell>
//                             <StyledTableCell align="right">Dislike Count</StyledTableCell>
//                             <StyledTableCell align="right">Comment Count</StyledTableCell>
//                             <StyledTableCell align="right">Description</StyledTableCell>
//                             <StyledTableCell align="right">Thumbnail</StyledTableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {videos.map((video) => {
//                             return <h3>Video</h3>
//                             // return <VideoRow video={video} key={video.VideoID} />
//                         })}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         )
//     }
// }

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const VideoTable = ({ videos }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Video ID</TableCell>
                        <TableCell>Channel ID</TableCell>
                        <TableCell>Channel Title</TableCell>
                        <TableCell>Trending Date </TableCell>
                        <TableCell>Region</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Published Date</TableCell>
                        <TableCell>Category ID</TableCell>
                        <TableCell>Tags</TableCell>
                        <TableCell>View Count</TableCell>
                        <TableCell>Likes</TableCell>
                        <TableCell>Dislikes</TableCell>
                        <TableCell>Comment Count</TableCell>
                        <TableCell>Comments Disabled</TableCell>
                        <TableCell>Thumbnail</TableCell>
                        <TableCell>Ratings Disabled</TableCell>
                        <TableCell>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {videos.map((video, index) => (
                        <TableRow key={index}>
                            <TableCell>{video.VideoID}</TableCell>
                            <TableCell>{video.ChannelID}</TableCell>
                            <TableCell>{video.ChannelTitle}</TableCell>
                            <TableCell>{video.TrendingDate.toLocaleString()}</TableCell>
                            <TableCell>{video.Region}</TableCell>
                            <TableCell>{video.Title}</TableCell>
                            <TableCell>{video.PublishedDate.toLocaleString()}</TableCell>
                            <TableCell>{video.CatgID}</TableCell>
                            <TableCell>{video.Tags.join(', ')}</TableCell>
                            <TableCell>{video.ViewCount}</TableCell>
                            <TableCell>{video.Likes}</TableCell>
                            <TableCell>{video.Dislikes}</TableCell>
                            <TableCell>{video.CommentCount}</TableCell>
                            <TableCell>{video.CommentDisabled.toString()}</TableCell>
                            <TableCell>
                                <img src={video.ThumbLink} alt={video.Title} width="100" />
                            </TableCell>
                            <TableCell>{video.RatingsDisabled.toString()}</TableCell>
                            <TableCell>{video.Description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default VideoTable;



