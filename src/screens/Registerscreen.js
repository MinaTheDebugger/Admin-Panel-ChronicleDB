
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// Toast when Succesullfy registered

const RegisterSucessfullyNotify = () => {
    toast.success('Registered Successfully', {
        position: "top-right",
        className: "succesnotify",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}


// Toast when Fields are missing

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


// Taost when passwords doesn't match
const errorPasswords = () => {

    toast.error(' Please rewrite your password correctly!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}




function Registerscreen() {

    // All Varaibles of the Register function
    let history = useHistory();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [showPassword1, setShowPassword1] = useState("");
    const [showPassword2, setShowPassword2] = useState("");
    const [errorName, setErrorName] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword1, setErrorPassword1] = useState(false)
    const [errorPassword2, setErrorPassword2] = useState(false)



    // When signUp is successfull go to loginscreen

    function goToLoginScreen() {
        Cookies.remove('User1')
        history.push("/");
        Cookies.set('refresh', false, { expires: 7 })
        RegisterSucessfullyNotify()
    }

    // reading the name entered by the user
    const setname = event => {
        setName(event.target.value)
    }

    // reading the Email entered by the user
    const setemail = event => {
        setEmail(event.target.value)
    }

    // reading the first Passwrod entered by the user
    const setpassword1 = event => {
        setPassword1(event.target.value)
    }

    // reading the second Passwrod entered by the user
    const setpassword2 = event => {
        setPassword2(event.target.value)
    }

    // Show OR Hide the first Passwrod entered by the user

    const handleClickShowPassword1 = () => {
        setShowPassword1(!showPassword1)
    }

    //Default hidden  Password
    const handleMouseDownPassword1 = (event) => {
        event.preventDefault();
    };
    // Show OR Hide the second Passwrod entered by the user
    const handleClickShowPassword2 = () => {
        setShowPassword2(!showPassword2)
    }
    //Default hidden  Password

    const handleMouseDownPassword2 = (event) => {
        event.preventDefault();
    };




    // SignUp funtion
    const signUp = async (email, password, name) => {



        let error = false;
        if (name === "") {
            setErrorName(true)            // if missing set error
            error = true;
        }

        if (email === "") {
            setErrorEmail(true)               // if missing set error
            error = true;
        }

        if (password1 === "") {
            setErrorPassword1(true)                // if missing set error
            error = true;
        }


        if (password2 === "") {
            setErrorPassword2(true)                       // if missing set error
            error = true;
        }

        if (error === true) {
            errorMissingFields();                               // if missing set error
            return;
        }

        if (password1 !== password2) {
            setErrorPassword2(true)                                 // if missing set error
            errorPasswords();
            return;
        }

        try {
            const signUpDetails = {
                name: name,                                                         // trying to signup
                email: email,
                password: password
            };
            const response = await axios.post('http://localhost:5000/user/register', signUpDetails)
            console.log(response.data)

            goToLoginScreen()                        // when succesfull goto loginscreen



        } catch (err) {
            console.error(err + "sssssssssssssssssssssssss" + email)
        }


    }




    return (
        <div className='register'>
            <div>
                <h2 className='title'>Register:
                    Please fill the detials
                </h2>
            </div>
            <div>
                <div >
                    <TextField
                        error={errorName}
                        className='textfield'
                        onChange={setname}
                        helperText={errorName ? "Please enter your name" : ""}
                        label="Name"
                        defaultValue=""
                        fullWidth
                        sx={{ m: 1, width: '51ch' }}

                    />

                </div>
            </div>

            <div >

                <div >
                    <TextField
                        className='textfield'
                        onChange={setemail}
                        error={errorEmail}
                        label="Email"
                        type="email"
                        required
                        id="outlined-required"
                        helperText={errorEmail ? "Please enter your Email" : ""}
                        defaultValue=""
                        fullWidth
                        sx={{ m: 1, width: '51ch' }}

                    />
                </div>
            </div>




            <div >



                <div >
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            error={errorPassword1}
                            helperText={errorPassword1 ? "Please enter your Password" : ""}
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
            <div>



                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password" className='textfeild5'>Password</InputLabel>
                    <OutlinedInput
                        error={errorPassword2}
                        helperText={errorPassword2 ? "Please enter your Password" : ""}
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




            </div>

            <div >



                <Button variant="contained" size="small" type="submit" className='registerbutton' onClick={() => signUp(email, password1, name)} >
                    Register
                </Button>


            </div>

            <div className='SignIndiv'>
                <label  >Are you already registered?</label>
                <Link to={{
                    pathname: "/"
                }}>
                    <Button variant="contained" size="small" type="submit"  >
                        Sign In
                    </Button>
                </Link>

            </div>
            <ToastContainer />

        </div >
    )

}

export default Registerscreen;
