import React, { Component } from 'react'
import axios from 'axios'
import { TextField } from '@mui/material';
import '../screens/loginscreeen.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import { ImageBackground } from 'react-native';

import pic1 from '../assets/pic1.jpg'

import { useCookies } from 'react-cookie';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";







function Loginscreeen() {






    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [walid, setWalid] = useState(false);

    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    // const [cookies, setCookie, removeCookie] = useCookies(['user']);




    const setemail = event => {
        setEmail(event.target.value)
    }


    const setpassword = event => {

        setPassword(event.target.value)

    }




    const handleClickShowPassword = () => {

        setShowPassword(!showPassword)




    }


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };




    const SignIn = async (email, password) => {




        if (email === "" || password === "") {

            setErrorEmail(true)
            setErrorPassword(true)

        } else {


            try {
                const signInDetails = {
                    email: email,
                    password: password
                };
                const response = await axios.post('http://localhost:5000/user/login', signInDetails)
                console.log("the data is of walidddddd ", response.data)
                //  alert(response.data.userId)

                Cookies.set('User1', true, { expires: 1 })
                Cookies.set('UserID', response.data.userId, { expires: 1 })
                //  alert(Cookies.get('UserID'))
                Cookies.set('refresh', true, { expires: 1 })
                Cookies.set('Name', response.data.Name, { expires: 1 })
                // alert(Cookies.get('Name'))
                history.push("/Home");
                await window.location.reload();



                //    setCookie('user', response.data.message)
                //    alert(cookies + "Cookies")

            } catch (err) {

                console.error("error while Signing In is  ", err)
                setErrorEmail(true)
                setErrorPassword(true)
            }

        }
    }



    const printEmail = () => {
        console.log(email + "EMAILLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
        console.log(password + "PAssworddddddddddddddddddddddddddddddd");
    }



    return (

        <div className="login1"

        //      styles={{ backgroundImage: `url(${pic1})` }}


        >






            <div className='email'>
                <TextField

                    error={errorEmail}
                    onChange={setemail}

                    helperText={errorEmail ? "Invalid Email or Password" : ""}
                    label="Email"
                    type="email"

                    defaultValue=""
                    fullWidth

                    sx={{ m: 1, width: '51ch' }}

                />









            </div>


            <div>





                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput

                        onChange={setemail}
                        error={errorPassword}
                        helperText={errorPassword ? "Invalid Email or Password" : ""}

                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={setpassword}
                        sx={{ m: 1, width: '50ch' }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : < Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>

            </div>
            <div>
                {/*
                    <Link to={{
                        pathname: "/Home"
                    }}>       */}

                <Button variant="contained" size="large" type="submit" className='signinbutton' onClick={() => SignIn(email, password)} >
                    Sign IN
                </Button>
                {/*          </Link> */}
            </div>

            <div className='stillnotregisterd'>
                <label for="one" >Still not registered?</label>



                <Link to={{
                    pathname: "/register"
                }}>
                    <Button variant="contained" size="small" type="submit" className='signUp' onClick={() => printEmail} >
                        Register
                    </Button>
                </Link>

            </div>

        </div >
    )

}


export default Loginscreeen
