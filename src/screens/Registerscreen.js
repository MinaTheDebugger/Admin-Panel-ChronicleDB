import React, { Component } from 'react';
import { TextField } from '@mui/material';
import '../screens/register.css';
import FormControl from '@mui/material/FormControl';
import axios from 'axios'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';








export class Registerscreen extends Component {



    constructor(props) {
        super(props)


        this.state = {
            name: '',
            email: '',
            phonenumber: 123456789,
            password1: '',
            password2: '',
            passwordconfirm: '',
            showPassword1: false,
            showPassword2: false,
        }
    }


    setname = event => {
        this.setState({
            name: event.target.value,

        }
        )
    }


    setemail = event => {
        this.setState({
            email: event.target.value,

        }
        )
    }



    setphonenumber = event => {
        this.setState({
            phonenumber: event.target.value,

        }
        )
    }

    setpassword1 = event => {
        this.setState({
            password1: event.target.value,

        }
        )
    }


    setpassword2 = event => {
        this.setState({
            password2: event.target.value,

        }
        )
    }



    handleClickShowPassword1 = () => {
        this.setState({
            showPassword1: !this.state.showPassword1,
        })
    }


    handleMouseDownPassword1 = (event) => {
        event.preventDefault();
    };

    handleClickShowPassword2 = () => {
        this.setState({
            showPassword2: !this.state.showPassword2,
        })
    }


    handleMouseDownPassword2 = (event) => {
        event.preventDefault();
    };



    signUp = async (email, password, name, phonenumber) => {
        try {
            const signUpDetails = {
                name: name,
                email: email,
                phonenumber: phonenumber,
                password: password
            };
            const response = await axios.post('http://localhost:5000/user/register', signUpDetails)
            console.log(response.data)
        } catch (err) {
            console.error(err + "sssssssssssssssssssssssss" + email)
        }
    }








    render() {
        return (
            <div className='register'>



                <h2>Register:
                    Please fill the detials
                </h2>



                <div>


                    <div className='textdiv'>
                        {/* className='text'   */}
                        <text className='text'  > <big>Name:</big></text>

                    </div>
                    <div className='textfielddiv'>
                        <TextField
                            className='textfield'
                            onChange={this.setname}


                            label="Name"


                            defaultValue=""
                            fullWidth

                            sx={{ m: 1, width: '51ch' }}

                        />

                    </div>
                </div>

                <div className='bigdiv'>
                    <div className='textdiv'>
                        <text className='text'  > <big>Email:*</big></text>
                    </div>
                    <div className='textfielddiv'>
                        <TextField
                            className='textfield'
                            onChange={this.setemail}


                            label="Email"
                            type="email"
                            required
                            id="outlined-required"

                            defaultValue=""
                            fullWidth

                            sx={{ m: 1, width: '51ch' }}

                        />
                    </div>
                </div>

                <div className='bigdiv'>
                    <div className='textdiv'>
                        <text className='text' > <big>Telefon:</big></text>
                    </div>

                    <div className='textfielddiv'>
                        <TextField
                            className='textfield'
                            onChange={this.setphonenumber}


                            label="Phone Number"


                            defaultValue=""
                            fullWidth

                            sx={{ m: 1, width: '51ch' }}

                        />

                    </div>
                </div>


                <div className='bigdiv'>

                    <div className='textdiv'>
                        <text className='text' > <big>Password:*</big></text>
                    </div>


                    <div className='textfielddiv'>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput

                                id="outlined-adornment-password"
                                type={this.state.showPassword1 ? 'text' : 'password'}
                                value={this.state.password1}
                                onChange={this.setpassword1}
                                sx={{ m: 1, width: '50ch' }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleClickShowPassword1}
                                            onMouseDown={this.handleMouseDownPassword1}
                                            edge="end"
                                        >
                                            {this.state.showPassword1 ? <VisibilityOff /> : < Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>

                    </div>

                </div>




                <div className='textdiv'>
                    <text className='confirmtext' > <big>Confirm:*</big></text>
                </div>


                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password" className='textfeild5'>Password</InputLabel>
                    <OutlinedInput

                        id="outlined-adornment-password"
                        type={this.state.showPassword2 ? 'text' : 'password'}
                        value={this.state.password2}
                        onChange={this.setpassword2}
                        sx={{ m: 1, width: '50ch' }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={this.handleClickShowPassword2}
                                    onMouseDown={this.handleMouseDownPassword2}
                                    edge="end"
                                >
                                    {this.state.showPassword2 ? <VisibilityOff /> : < Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>






                <div className='registerButtondiv'>

                    {/*  <Link to={{
                        pathname: "/"
                    }}>
                */}
                    <Button variant="contained" size="small" type="submit" className='registerbutton' onClick={() => this.signUp(this.state.email, this.state.password1, this.state.name, this.state.phonenumber)} >
                        Register
                    </Button>
                    {/*    </Link>        */}

                </div>

            </div >
        )
    }
}


