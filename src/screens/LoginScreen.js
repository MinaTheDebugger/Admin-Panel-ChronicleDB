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








export default class Loginscreeen extends Component {



    constructor(props) {
        super(props)


        this.state = {
            email: '',
            password: '',
            showPassword: false,
            walid: false,
        }
    }



    setemail = event => {
        this.setState({
            email: event.target.value,

        }
        )
    }


    setpassword = event => {
        this.setState({
            password: event.target.value,

        }
        )
    }


    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword,
        })
    }


    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };




    SignIn = async (email, password) => {

        if (email === "" || password === "") {


        } else {


            try {
                const signInDetails = {
                    email: email,
                    password: password
                };
                const response = await axios.post('http://localhost:5000/user/login', signInDetails)
                console.log("the data is of walidddddd ", response.data)
                alert(response.data.logged_in)
            } catch (err) {
                console.error("error while Signing In is  ", err)
            }

        }
    }






    render() {
        return (

            <div className="login1"

            //      styles={{ backgroundImage: `url(${pic1})` }}


            >






                <div className='email'>
                    <TextField

                        onChange={this.setemail}


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
                            id="outlined-adornment-password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.password}
                            onChange={this.setpassword}
                            sx={{ m: 1, width: '50ch' }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {this.state.showPassword ? <VisibilityOff /> : < Visibility />}
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

                    <Button variant="contained" size="large" type="submit" className='signinbutton' onClick={() => this.SignIn(this.state.email, this.state.password)} >
                        Sign IN
                    </Button>
                    {/*          </Link> */}
                </div>

                <div className='stillnotregisterd'>
                    <label for="one" >Still not registered?</label>



                    <Link to={{
                        pathname: "/register"
                    }}>
                        <Button variant="contained" size="small" type="submit" className='signUp'   >
                            Register
                        </Button>
                    </Link>

                </div>

            </div >
        )
    }
}


