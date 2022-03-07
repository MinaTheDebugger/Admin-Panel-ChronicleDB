
import axios from 'axios'
import { TextField } from '@mui/material';
import '../screens/loginscreeen.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";


// Toast when fields are missing

const errorMissingFields = () => {

    toast.error(' Please Fill the missing Fields to continue!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

// Toast when Invalid Email or Password are entered
const InvalidEmailOrPassword = () => {

    toast.error('Invalid Email or Password !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}




function Loginscreeen() {

    //  All Variable of loginscreen
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)




    // reading the email entered by the user
    const setemail = event => {
        setEmail(event.target.value)
    }

    // reading the password entered by the user
    const setpassword = event => {
        setPassword(event.target.value)
    }



    //Show Or Hide the Password entered by the User
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    // Deafault hidden Password
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    //signin ficntion

    const SignIn = async (email, password) => {

        let error = false;


        if (email === "") {                  // if missing set error
            setErrorEmail(true)
            error = true;

        } if (password === "") {                // if missing set error
            setErrorPassword(true)
            error = true;

        } if (error === true) {                  // if missing set error
            errorMissingFields()
            return;
        }

        else {

            try {
                const signInDetails = {
                    email: email,
                    password: password
                };
                const response = await axios.post('http://localhost:5000/user/login', signInDetails)                   // try to signin
                console.log("the data is of walidddddd ", response.data)


                Cookies.set('Isloogedin', true, { expires: 1 })                    //when successfully set Cookies of the status signIN
                Cookies.set('UserID', response.data.userId, { expires: 1 })        //save UserID
                Cookies.set('refresh', true, { expires: 1 })                       //refresh to go to Homepage
                Cookies.set('Name', response.data.Name, { expires: 1 })            // save the Name of the User
                Cookies.set('isAdmin', response.data.isadmin, { expires: 1 })      // is the user admin
                history.push("/Home");                                              // go to Home
                await window.location.reload();                                      // reload one time





            } catch (err) {                                                        // error Toast Error
                InvalidEmailOrPassword();
                console.error("error while Signing In is  ", err)

            }

        }
    }




    return (

        <div className="login1"




        >
            <div className='email'>
                <TextField
                    error={errorEmail}
                    onChange={setemail}
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
                        error={errorPassword}
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
                    <Button variant="contained" size="small" type="submit" className='signUp'  >
                        Register
                    </Button>
                </Link>

            </div>
            <ToastContainer />
        </div >
    )

}


export default Loginscreeen
