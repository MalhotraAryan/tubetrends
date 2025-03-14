
import React, { Component } from 'react'
import axios from 'axios';
import Video from '../Objects/Video';
import { SERVER_URL } from '../Utils/constants';
import VideoTable from '../Components/VideoTable';
import { ConstructionOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import SearchBar from '../Components/SearchBar';
import GroupVideo from '../Objects/GroupVideo';
import UnionVideo from '../Objects/UnionVideo';
import UnionVideoTable from '../Components/UnionVideoTable';
import GroupVideoTable from '../Components/GroupVideoTable';
import { Button } from '@mui/material';
import "../Components/styles.css";
import { TextField } from '@mui/material';
import TrendingTagsTable from '../Components/TrendingTagsTable';
import PopularVideoTable from '../Components/PopularVideoTable';



export default function Home(props) {
    const user = props.user;
    const setUser = props.setUser;
    const [joinRes, setGroupRes] = useState([]);
    const [unionRes, setUnionRes] = useState([]);
    const [trendingAppearences, setTrendingAppearences] = useState(2);
    const [likes, setLikes] = useState(200000);
    const [limit, setLimit] = useState(10);
    const [category, setCategory] = useState("Music");
    const [categoryLikes, setCategoryLikes] = useState(100000);
    const [topN, setTopN] = useState(10);
    const [trendingTags, setTrendingTags] = useState([]);
    const [popularVideos, setPopularVideos] = useState([]);

    const getAdvGroup = async () => {
        try {

            console.log(trendingAppearences, ":", likes)
            const response = await axios.get(`${SERVER_URL}/advancedgroup`, {
                params: {
                    min_count: trendingAppearences,
                    min_avg_likes: likes,
                },
            });
            const res = [];
            for (const data of response.data) {
                const tmp = new GroupVideo(data);

                res.push(tmp)
            }
            setGroupRes(res);

        } catch (error) {
            console.log(error)
            setGroupRes([]);
        }
    }
    const getAdvUnion = async () => {
        try {


            const response = await axios.get(`${SERVER_URL}/advancedunion`, {
                params: {
                    min_likes: categoryLikes,
                    tags: category,
                },
            });

            const res = [];
            console.log(response.data)
            for (const data of response.data) {
                const tmp = new UnionVideo(data);

                res.push(tmp)
            }
            setUnionRes(res);

        } catch (error) {
            console.log(error)
            setUnionRes([]);
        }
    }
    const getPopularVideos = async () => {
        try {


            const response = await axios.get(`${SERVER_URL}/get-popular-videos`, {
                params: {
                    minLikes: 100000,
                    minViews: 1000000,
                    region: "US"
                },
            });

            const res = [];
            console.log(response.data)
            for (const data of response.data) {
                res.push(data)
            }
            setPopularVideos(res);

        } catch (error) {
            console.log(error)
            setPopularVideos([]);
        }
    }

    const getTrendingTags = async () => {
        try {


            const response = await axios.get(`${SERVER_URL}/top-trending-tags`, {
                params: {
                    topN: topN
                },
            });

            const res = [];
            console.log(response.data)
            for (const data of response.data) {
                res.push(data)
            }
            setTrendingTags(res);

        } catch (error) {
            console.log(error)
            setTrendingTags([]);
        }
    }

    const handleGetGroup = async () => {
        await getAdvGroup();
    }

    const handleGetUnion = async () => {
        await getAdvUnion();
    }
    const handleGetPopularVideos = async () => {
        await getPopularVideos();
    }


    return (
        <div className='form'>
            <h1>Advanced Queries</h1>
            <ul>
                <l1><Button onClick={handleGetGroup}> Return channels which have had at least  {<TextField
                    label="Appearances"
                    variant="outlined"
                    type="number"
                    value={trendingAppearences}
                    onChange={(event) => setTrendingAppearences(event.target.value)}
                />}  trending appearances with average likes above {<TextField
                    label="Likes"
                    variant="outlined"
                    type="number"
                    value={likes}
                    onChange={(event) => setLikes(event.target.value)}
                />} </Button>
                    {joinRes.length > 0 && <GroupVideoTable videos={joinRes} />}</l1>
                <li> <Button onClick={handleGetUnion}> Return 15 most viewed  {<TextField
                    label="Category"
                    variant="outlined"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                />} videos or videos with at least {<TextField
                    label="Likes"
                    variant="outlined"
                    value={categoryLikes}
                    onChange={(event) => setCategoryLikes(event.target.value)}
                />}
                </Button>
                    {unionRes.length > 0 && <UnionVideoTable videos={unionRes} />} </li>
                <li> <Button onClick={handleGetPopularVideos}> Return most popular videos in the US (min 1,000,000 views and 100,000 likes)</Button>
                    {popularVideos.length > 0 && <PopularVideoTable data={popularVideos} />} </li>
                <li><Button onClick={getTrendingTags}> Return top {<TextField
                    label="Top N"
                    variant="outlined"
                    value={topN}
                    onChange={(event) => setTopN(event.target.value)}
                />} trending tags</Button>
                    {trendingTags.length > 0 && <TrendingTagsTable data={trendingTags} />}</li>
            </ul>
        </div>
    );
}


