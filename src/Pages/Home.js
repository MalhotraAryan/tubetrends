
import React, { Component } from 'react'
import axios from 'axios';
import Video from '../Objects/Video';
import { SERVER_URL } from '../Utils/constants';
import VideoTable from '../Components/VideoTable';
import { ConstructionOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import SearchBar from '../Components/SearchBar';
import "../Components/styles.css";

export default function Home(props) {
    const user = props.user;
    const setUser = props.setUser;
    const [videos, setVideos] = useState([]);
    const [params, setParams] = useState({});

    useEffect(() => {
        getVideos(params, setVideos);
    }, [params]);

    const getVideos = async (params, setVideos) => {
        try {


            const response = await axios.get(`${SERVER_URL}/videos`, {
                params: {
                    User: props.user,
                    Title: params.Title,
                    ChannelTitle: params.ChannelTitle,
                    TrendingDate: params.TrendingDate,
                    Tags: params.Tags,
                    Region: params.Region,
                    isFavorite: params.isFavorite
                }

            });

            const videos = [];
            for (const data of response.data) {
                const video = new Video(data);
                videos.push(video)
            }
            setVideos(videos);

        } catch (error) {
            console.log(error)
            setVideos([]);
        }
    }
    return (
        <div className='form'>
            <SearchBar params={params} setParams={setParams} />

            <VideoTable videos={videos} />
        </div>
    );
}


