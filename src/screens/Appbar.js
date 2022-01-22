import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './Appbar.css';


import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';




function Appbar() {

    let history = useHistory();

    function goToHomePage() {
        history.push("/Home");
    }

    function goToCreateStreamPage() {
        history.push("/CreateStream");
    }


    function goToAboutPage() {
        history.push("/About");
    }

    function goToLoginScreen() {
        Cookies.remove('User1')
        history.push("/");

        Cookies.set('refresh', false, { expires: 7 })

    }



    return (


        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={goToHomePage}
                    >
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Home

                        </Typography>

                    </IconButton>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={goToCreateStreamPage}
                    >
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            CreateStream

                        </Typography>

                    </IconButton>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={goToAboutPage}
                    >
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            About

                        </Typography>

                    </IconButton>

                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={goToLoginScreen}
                        className='logoutbutton'
                    >
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className='logoutbutton'  >
                            Logout

                        </Typography>

                    </IconButton>


                </Toolbar>
            </AppBar>
        </Box>

    )
}

export default Appbar