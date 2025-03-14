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

const bcrypt = require('bcryptjs');
const SALTROUNDS = 5;
const SERVER_URL = "http://localhost:4242";
const theme = createTheme();
const SIGNUP_PROMPT = "Don't have an account? Sign Up";
const SIGNIN_PROMPT = "Already have an account? Sign In";

const registerUser = async (Email, Password) => {
    try {
        Password = bcrypt.hashSync(Password, SALTROUNDS);
        const data = { 'UserName': Email, Email, Password }
        const response = await axios.post(`${SERVER_URL}/register`, data)
        console.log(response)
        return response;

    } catch (error) {
        console.log(error.response)
        return error.response
    }
}


const loginUser = async (Email, Password) => {
    try {
        const url = `${SERVER_URL}/login`;
        const data = { Email };
        const response = await axios.post(url, data);
        console.log(response);

        return response;
    } catch (error) {
        console.log(error.response)
        return error.response;
    }
}

function isValidEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

function doesPasswordMatch(password, rpt_password) {
    return password === rpt_password;
}



/*
FIXME: 
   -Stale repeat password value issue 
*/
export default function Form(props) {

    const [isSignUp, setIsSignUp] = useState(false);
    const passwordRef = useRef(null);
    const rpt_passwordRef = useRef(null);
    const emailRef = useRef(null);
    const [emailVal, setEmailVal] = useState("");
    const [passwordVal, setPasswordVal] = useState("");
    const [rpt_passwordVal, setRpt_passwordVal] = useState("");
    const navigate = useNavigate();

    const user = props.user;
    const setUser = props.setUser;
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setEmailVal(data.get('email'));
        setPasswordVal(data.get('password'));
        if (isSignUp) {
            setRpt_passwordVal(data.get('rpt_password'));
            if (signUpChecks()) {
                const response = await registerUser(emailVal, passwordVal);
                if (response.data.code === undefined) {
                    const username = emailVal;
                    const email = emailVal;
                    const password = bcrypt.hashSync(passwordVal, SALTROUNDS);
                    const userData = new User({ UserName: username, Email: email, Password: password });
                    setUser(userData);
                    navigate("/home")
                } else {
                    const errMsg = response.data.sqlMessage
                    alert(errMsg);
                }
            } else {
                return;
            }
        } else {
            if (isValidEmail(emailVal)) {
                const response = await loginUser(emailVal, passwordVal);
                if (response) {
                    if (response.data.length === 0) {
                        alert("User not found");
                    } else {
                        setUser(response.data[0]);
                        navigate("/home");
                    }
                } else {
                    console.log(response);
                    alert("Error logging in");
                }

            }
        }

    };

    const toggleSignUpState = () => {
        setIsSignUp(!isSignUp);
    }


    const signUpChecks = () => {
        console.log("emailVal: ", emailVal);
        if (!isValidEmail(emailVal)) {
            alert("Invalid email");
            return false;
        }
        console.log(passwordVal, rpt_passwordVal)
        if (!doesPasswordMatch(passwordVal, rpt_passwordVal)) {
            alert("Passwords do not match");
            return false;
        }
        return true;
    }


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
                        {isSignUp ? "Sign Up" : "Sign in"}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            ref={emailRef}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            ref={passwordRef}
                        />
                        {isSignUp && <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="rpt_password"
                            label="Repeat Password"
                            type="password"
                            id="rpt_password"
                            ref={rpt_passwordRef}
                        />}
                        {<FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"

                        />}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isSignUp ? "Sign Up" : "Sign In"}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                {!isSignUp && <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>}
                            </Grid>
                            <Grid item>
                                <Link variant="body2" onClick={toggleSignUpState}>
                                    {isSignUp ? SIGNIN_PROMPT : SIGNUP_PROMPT}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}