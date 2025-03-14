import * as React from 'react';
import Header from './Components/Header/Header'
import "./Components/styles.css";
import User from './Objects/User';
import { useState, createContext, useContext } from 'react';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import History from './Pages/History';
import Favorites from './Pages/Favorites';
import Typography from "@mui/material/Typography";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdvancedQueries from './Pages/AdvancedQueries';


export default function MyApp() {
  const [user, setUser] = useState(null);

  return (
    <>
      <Typography align="center" variant="h3" component="div" sx={{ flexGrow: 1 }}>
        TubeTrends
      </Typography>
      <Header user={user} setUser={setUser} />
      <Routes>


        <Route path="/home" element={<Home user={user} setUser={setUser} />} />
        <Route path="/login" element={<Login user={user} setUser={setUser} />} />
        <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
        <Route path="/advanced-queries" element={<AdvancedQueries user={user} setUser={setUser} />} />
        <Route path="/history" element={<History user={user} setUser={setUser} />} />
        <Route path="/favorites" element={<Favorites user={user} setUser={setUser} />} />
        <Route exact path="/" element={<Home user={user} setUser={setUser} />}>

        </Route>
      </Routes>
    </>

  );
}
