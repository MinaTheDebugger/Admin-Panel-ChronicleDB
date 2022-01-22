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
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";
import { useState } from 'react';



/*
function goToLoginScreen() {

    history.push("/");



}

*/


function Registerscreen() {


    let history = useHistory();






    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordconfirm, setPasswordconfirm] = useState("''");
    const [showPassword1, setShowPassword1] = useState("");
    const [showPassword2, setShowPassword2] = useState("");





    function goToLoginScreen() {
        Cookies.remove('User1')
        history.push("/");

        Cookies.set('refresh', false, { expires: 7 })

    }

    const setname = event => {

        setName(event.target.value)


    }


    const setemail = event => {
        setEmail(event.target.value)
    }



    const setphonenumber = event => {
        setPhonenumber(event.target.value)
    }

    const setpassword1 = event => {
        setPassword1(event.target.value)
    }


    const setpassword2 = event => {
        setPassword2(event.target.value)
    }



    const handleClickShowPassword1 = () => {
        setShowPassword1(!showPassword1)
    }


    const handleMouseDownPassword1 = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword2 = () => {
        setShowPassword2(!showPassword2)
    }


    const handleMouseDownPassword2 = (event) => {
        event.preventDefault();
    };



    const signUp = async (email, password, name, phonenumber) => {

        if (email === "" || password === "") {
            return;
        }
        else {

            try {
                const signUpDetails = {
                    name: name,
                    email: email,
                    phonenumber: phonenumber,
                    password: password
                };
                const response = await axios.post('http://localhost:5000/user/register', signUpDetails)
                console.log(response.data)
                goToLoginScreen()


            } catch (err) {
                console.error(err + "sssssssssssssssssssssssss" + email)
            }

        }
    }









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
                        onChange={setname}


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
                        onChange={setemail}


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
                        onChange={setphonenumber}


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
                            type={showPassword1 ? 'text' : 'password'}
                            value={password1}
                            onChange={setpassword1}
                            sx={{ m: 1, width: '50ch' }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword1}
                                        onMouseDown={handleMouseDownPassword1}
                                        edge="end"
                                    >
                                        {showPassword1 ? <VisibilityOff /> : < Visibility />}
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
                    type={showPassword2 ? 'text' : 'password'}
                    value={password2}
                    onChange={setpassword2}
                    sx={{ m: 1, width: '50ch' }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword2}
                                onMouseDown={handleMouseDownPassword2}
                                edge="end"
                            >
                                {showPassword2 ? <VisibilityOff /> : < Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>






            <div className='registerButtondiv'>



                <Button variant="contained" size="small" type="submit" className='registerbutton' onClick={() => signUp(email, password1, name, phonenumber)} >
                    Register
                </Button>


            </div>

        </div >
    )

}

export default Registerscreen;
