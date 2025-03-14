
import React from 'react'
import { useState } from 'react';
import "../Components/styles.css";
import { Box, TextField, Button, Select, MenuItem } from '@mui/material';
// import { Form, FormControl, FormLabel, Dropdown } from "react-bootstrap";
import FavoriteIcon from '@mui/icons-material/Favorite';
function SearchBar(props) {

    const [videoTitle, setVideoTitle] = useState(props.params.Title);
    const [channelTitle, setChannelTitle] = useState(props.params.ChannelTitle);
    const [trendingDate, setTrendingDate] = useState(props.params.TrendingDate);
    const [tags, setTags] = useState(props.params.Tags);
    const [region, setRegion] = useState(props.params.Region);
    const [isFavorite, setIsFavorite] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        props.setParams({ ...props.params, Title: videoTitle, ChannelTitle: channelTitle, TrendingDate: trendingDate, Tags: tags, Region: region });
    }
    const handleFavorite = () => {
        setIsFavorite(!isFavorite);
        props.setParams({ ...props.params, Title: videoTitle, ChannelTitle: channelTitle, TrendingDate: trendingDate, Tags: tags, Region: region, isFavorite: isFavorite  });
    };

    return (

        <Box
            component="form"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1,
            }}
        >
            <TextField
                label="Video Title"
                variant="outlined"
                value={videoTitle}
                onChange={(event) => setVideoTitle(event.target.value)}
            />
            <TextField
                label="Channel Title"
                variant="outlined"
                value={channelTitle}
                onChange={(event) => setChannelTitle(event.target.value)}
            />
            <TextField
                className='trending'
                label="Trending Date (YYYY-MM-DD)"
                variant="outlined"
                value={trendingDate}
                onChange={(event) => setTrendingDate(event.target.value)}
            />
            <TextField
                label="Tags"
                variant="outlined"
                value={tags}
                onChange={(event) => setTags(event.target.value)}
            />
            <Select
                value={"US"}
                className='select'
                label="Region"
                onChange={(event) => setRegion("US")}
            >
                <MenuItem value={"US"}>US</MenuItem>
            </Select>
            <Button variant="contained" onClick={handleSubmit}>
                Search
            </Button>
            <Button variant="contained" onClick={handleFavorite}>

                <FavoriteIcon color={isFavorite ? 'yellow' : 'disabled'} />
            </Button>
        </Box>
    )
}

export default SearchBar