import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import User from '../Objects/User';

const bycrypt = require('bcryptjs');
const SALTROUNDS = 5;
const SERVER_URL = "http://localhost:4242";
const theme = createTheme();
const SIGNUP_PROMPT = "Don't have an account? Sign Up";
const SIGNIN_PROMPT = "Already have an account? Sign In";

const updateUser = async (data) => {
    try {
        console.log("data:", data)
        // const userData = { 'UserName': data.Username, 'Email': data.Email, 'Password': data.Password, 'FirstName': data.FirstName, 'LastName': data.LastName, 'PhoneNumber': data.PhoneNumber };
        const response = await axios.post(`${SERVER_URL}/updateuser`, data)
        console.log(response)
        return response;

    } catch (error) {
        console.log(error.response)
        return error.response
    }
}

const deleteUser = async (data) => {
    try {
        console.log("data:", data)

        const response = await axios.post(`${SERVER_URL}/deleteuser`, data)
        console.log(response)
        return response;

    } catch (error) {
        console.log(error.response)
        return error.response
    }
}



/*
FIXME: 
   -Stale repeat password value issue 
*/
export default function ProfileForm(props) {

    const user = props.user;
    const setUser = props.setUser;
    const [values, setValues] = useState(user);
    // useEffect(() => {
    //     console.log(values)
    //     setValues({
    //         'UserName': props.user.UserName,
    //         'Email': props.user.Email,
    //         'Password': props.user.Password,
    //         'FirstName': props.user.FirstName,
    //         'LastName': props.user.LastName,
    //         'PhoneNumber': props.user.PhoneNumber,
    //     });
    // }, []);

    const [firstname, setFirstName] = useState(values.FirstName);
    const [lastname, setLastName] = useState(values.LastName);
    const [phonenumber, setPhoneNumber] = useState(values.PhoneNumber);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setValues({ ...values, 'FirstName': firstname, 'LastName': lastname, 'PhoneNumber': phonenumber });
        console.log(values);
        const response = await updateUser(values);
        if (response.status === 200) {
            console.log("User updated");
            setUser(new User(values));
        } else {
            console.log("Error updating user")

        }



    };

    const handleDelete = async (event) => {
        event.preventDefault();

        const response = await deleteUser(values);
        if (response.status === 200) {
            console.log("User deleted");
            setUser(null);
            alert("User deleted");
            navigate('/home');
        } else {
            console.log("Error deleting user")

        }
    };




    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {"Profile"}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Box component="div" sx={{ display: 'inline' }}>Email: </Box>
                        <Box component="div" sx={{ display: 'inline' }}>{props.user.Email}</Box>
                        <br />
                        <Box component="div" sx={{ display: 'inline' }}>UserName: </Box>
                        <Box component="div" sx={{ display: 'inline' }}>{props.user.UserName}</Box>
                        <TextField
                            margin="normal"
                            fullWidth
                            name="firstname"
                            label="FirstName"
                            type="firstname"
                            id="firstname"
                            value={firstname}
                            onChange={(event) => setFirstName(event.target.value)}

                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="lastname"
                            label="LastName"
                            type="lastname"
                            id="lastname"
                            value={lastname}
                            onChange={(event) => setLastName(event.target.value)}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="phonenumber"
                            label="Phone Number: (+1)"
                            type="phoneNumber"
                            id="phonenumber"
                            value={phonenumber}
                            onChange={(event) => setPhoneNumber(event.target.value)}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {"Submit"}
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: 'red' }}
                            onClick={handleDelete}
                        >
                            {"Delete Account"}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}