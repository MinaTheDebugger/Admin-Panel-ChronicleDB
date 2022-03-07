import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
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


    function goToJobsPage() {
        history.push("/Jobs")
    }

    function Signout() {
        Cookies.remove('User1')
        history.push("/");

        Cookies.set('refresh', false, { expires: 1 })
        Cookies.set('isAdmin', false, { expires: 1 })
        Cookies.set('Name', "NO", { expires: 1 })
        Cookies.set('UserID', '00000000000000000000000000', { expires: 1 })
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
                        onClick={goToJobsPage}
                    >
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Jobs

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


                    <Typography variant="h6" color="inherit" component="div" className='username'  >
                        {Cookies.get('Name')}
                    </Typography>


                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={Signout}
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