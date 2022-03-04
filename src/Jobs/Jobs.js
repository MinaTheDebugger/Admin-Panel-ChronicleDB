import React, { Component } from 'react'
import Select from '@mui/material/Select';
import './jobs.css'
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import axios from "axios";
import Cookies from 'js-cookie';

import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { DateTimePicker } from '@mui/lab';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';










const successShutDownNotify = (id) => {
    toast.warn(`Successfully Stream ${id} Turned Off`, {
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


const successRecovernotify = (id) => {
    toast.success(`Successfully Stream ${id} recovered`, {
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


const errorNoDate = () => {

    toast.error(' Please set a date first!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}






const errorShutdownNotify = (id) => {

    toast.error(`Error occurred while shutting down Stream ${id}!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}



export default class Jobs extends Component {


    constructor(props) {
        super(props)


        this.state = {
            arrayOFIdCurrenUser: [],
            choosenStream: "",
            showbox: false,
            shutdownswitch: false,
            RecoverDate: '',
            systemLoadSwitch: false,
            systemLoadTimer: 0,
            arrayofstreams: [],
            statusofthestream: false,
            StreamStatus: true,
            recoverSwitch: false,
            ShutdownDate: ''
        }
    }


    async componentDidMount() {
        setInterval(() => {
            this.fetchData()

        }, 500);
    }

    componentDidMount() {
        setInterval(() => {
            this.getArrayOFStreamsIdOFTHeCurrentUser(Cookies.get('UserID'))

        }, 1000)
    }




    recover = () => {

        if (this.state.RecoverDate === '') {
            errorNoDate();
            return;
        }


        if (this.state.StreamStatus === true) {
            return;
        }
        var secondBetweenTwoDate = Math.abs((this.state.RecoverDate - new Date().getTime()));
        this.setState({
            recoverSwitch: true,
        })
        setTimeout(this.recover2, secondBetweenTwoDate)
    }


    setShutdwonTimer = (newValue) => {
        this.setState({
            ShutdownDate: newValue
        }, () => {
            //    alert(this.state.ShutdownDate)
        })
    }


    SetRecoverTime = (newValue) => {
        this.setState({
            RecoverDate: newValue
        })
    }










    recover2 = async () => {

        try {
            await fetch(`http://localhost:8000/recover_stream_snapshot/${this.state.choosenStream}`);
            this.setState({
                StreamStatus: true,
                shutdownswitch: false

            }, () => {
                //    alert(this.state.StreamStatus)
            })

            successRecovernotify(this.state.choosenStream);
        } catch (err) {
            alert(`Error is -->  ${err}`)
            this.setState({
                recoverSwitch: false
            })
        }

        //  alert("stream recovered successfully");
    }



    shutdown2 = async () => {
        try {
            const response = await fetch(`http://localhost:8000/shutdown_stream/${this.state.choosenStream}`)
            this.setState({
                disabledd: true,
                recoverSwitch: false,
                StreamStatus: false,
            })
            successShutDownNotify(this.state.choosenStream)

        } catch (err) {
            console.error(`Error is -->  ${err}`)
            this.setState({
                shutdownswitch: false,
            })
            errorShutdownNotify(this.state.choosenStream)
        }
    }






    shutdown = async () => {

        if (this.state.StreamStatus === false) {
            return
        }


        var secondBetweenTwoDate = Math.abs((this.state.ShutdownDate - new Date().getTime()));
        //alert(secondBetweenTwoDate / 1000)
        if (this.state.ShutdownDate === '') {
            errorNoDate();
            return
        }


        if (this.state.StreamStatus === true) {
            setTimeout(this.shutdown2, secondBetweenTwoDate);
            this.setState({
                shutdownswitch: true,
            })
        }



    }



    fetchData = async () => {
        try {
            const fetch1 = await fetch('http://localhost:8000/show_streams')
            const response1 = await fetch1.json()
            // alert(response1)
            this.setState({ arrayofstreams: response1 }, () => {
                // alert(this.state.choosenStream),
                //      alert(response1.length)
                if (response1.length >= 1) {
                    // When u see this error u was too fast , Just refresh the page and wait 2 seconds !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    // When u see this error u was too fast , Just refresh the page and wait 2 seconds !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    if (response1[this.state.choosenStream][1] === "Online") {
                        // When u see this error u was too fast , Just refresh the page and wait 2 seconds !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        // When u see this error u was too fast , Just refresh the page and wait 2 seconds !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        this.setState({
                            StreamStatus: true,
                            recoverSwitch: true
                        })
                    } else {
                        this.setState({
                            StreamStatus: false,
                            shutdownswitch: true,
                            recoverSwitch: false
                        })
                    }

                }
            });
        } catch (e) {
            alert(e)
        }
    }









    selectStream = event => {
        //   alert(Math.abs((new Date().getTime())))
        this.setState({
            choosenStream: event.target.value
        }, () => {
            this.fetchData()
            if (this.state.choosenStream != "") {
                this.setState({
                    showbox: true
                })
            } else {
                this.setState({
                    showbox: false
                })
            }
        }
        )
    }






    getArrayOFStreamsIdOFTHeCurrentUser = async (id) => {
        try {
            const url = await `http://localhost:5000/user/streamperuser?user_id=${id}`
            const response = await axios(url);
            const data = await response.data;

            let array = [];
            array.unshift('');
            let array2 = array.concat(data)
            /* 
     
             data.forEach(element => {
                 this.state.arrayOFIdCurrenUser.push(element)
             });
             */
            data.unshift('');
            this.setState({
                arrayOFIdCurrenUser: array2
            }, () => {
                //   alert(this.state.arrayOFIdCurrenUser)
            }
            )
        } catch (err) {
            alert(err)
            console.error(`Error is -->  ${err}`)
        }
    }





    render() {
        return (
            <div className='maindiv'>

                <div>
                    <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Select Stream"
                        // className='selectStream'
                        sx={{ m: 1, width: '70ch' }}
                        //value={currency}
                        onChange={this.selectStream}
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Please select a Stream to continue"
                    >
                        {this.state.arrayOFIdCurrenUser.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </TextField>
                </div>
                {this.state.showbox ?
                    <div className='boxdiv'>

                        <Box sx={{
                            width: '100%',
                            width: 1100,
                            height: 450,
                            bgcolor: 'background.paper',
                            backgroundColor: 'LightYellow'
                        }} >
                            <div className='listofjobs'>
                                <div>
                                    <div className='jobtype'   ><h2>Job Type</h2></div>
                                    <div className='setintervall'><h2>Set Interval</h2></div>
                                </div>
                                <div className="listdiv1">
                                    <div className='jobtype1'  >
                                        <h2 className='JobName'>Shutdown:</h2>
                                    </div>
                                    <div className='off'>
                                        <Typography>Off</Typography>
                                    </div>
                                    <div className='switch'>
                                        <FormControlLabel checked={this.state.shutdownswitch} onChange={this.shutdown} control={<Switch />} label="" className='chechlog' />
                                    </div>
                                    <div className='on'>
                                        <Typography>On</Typography>
                                    </div>
                                    <div className='intervalloptions'>
                                        <FormControl sx={{ m: 1, width: '38ch' }} variant="outlined">
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DateTimePicker
                                                    renderInput={(props) => <TextField {...props} />}
                                                    label="DateTimePicker"
                                                    value={this.state.ShutdownDate}
                                                    onChange={this.setShutdwonTimer}
                                                />
                                            </LocalizationProvider>
                                            <FormHelperText id="outlined-weight-helper-text">Shutdown works only one time!</FormHelperText>
                                        </FormControl>
                                    </div>
                                </div>

                                <div className="listdiv">
                                    <div className='jobtype1'  >
                                        <h2 className='JobNameRecover'>Recover:</h2>
                                    </div>
                                    <div className='offrecover'>
                                        <Typography>Off</Typography>
                                    </div>
                                    <div className='switchrecover'>
                                        <FormControlLabel disabled={this.state.StreamStatus} checked={this.state.recoverSwitch} onChange={this.recover} control={<Switch />} label="" className='chechlog' />
                                    </div>
                                    <div className='onrecover'>
                                        <Typography>On</Typography>
                                    </div>
                                    <div className='intervalloptions'>
                                        <FormControl sx={{ m: 1, width: '38ch' }} variant="outlined">
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DateTimePicker
                                                    renderInput={(props) => <TextField {...props} />}
                                                    label="DateTimePicker"
                                                    value={this.state.RecoverDate}
                                                    onChange={this.SetRecoverTime}
                                                />
                                            </LocalizationProvider>
                                            <FormHelperText id="outlined-weight-helper-text">Recover works only when stream is offline</FormHelperText>
                                        </FormControl>
                                    </div>
                                </div>
                                {/*
                                <div className="listdiv">
                                    <div className='jobtype1'  >
                                        <h2 className='JobName'>System Load:</h2>
                                    </div>
                                    <div className='off'>
                                        <Typography>Off</Typography>
                                    </div>
                                    <div className='switch'>
                                        <FormControlLabel disabled={this.state.StreamStatus} checked={this.state.systemloadswitch} onChange={this.systemLoad} control={<Switch />} label="" className='chechlog' />
                                    </div>
                                    <div className='on'>
                                        <Typography>On</Typography>
                                    </div>
                                    <div className='intervalloptions'>
                                        <FormControl sx={{ m: 1, width: '38ch' }} variant="outlined">
                                            <OutlinedInput
                                                size="small"
                                                id="outlined-adornment-weight"
                                                value={this.state.systemLoadTimer}
                                                onChange={this.setTimerSystemload}
                                                endAdornment={<InputAdornment position="end"> in sec</InputAdornment>}
                                                aria-describedby="outlined-weight-helper-text"
                                                inputProps={{
                                                    'aria-label': 'weight',
                                                }}
                                            />
                                            <FormHelperText id="outlined-weight-helper-text">Shutdown works only one time!</FormHelperText>
                                        </FormControl>
                                    </div>
                                </div>












                                <div className="listdiv" >
                                    <div className='jobtype1'  >
                                        <h2 className='JobName'>iii:</h2>
                                    </div>
                                    <div className='off'>
                                        <Typography>Off</Typography>
                                    </div>
                                    <div className='switch'>
                                        <FormControlLabel
                                            disabled={this.state.StreamStatus}
                                            checked={this.state.checklog}
                                            onChange={this.changelog}
                                            control={<Switch />}
                                            label="" className='chechlog' />
                                    </div>
                                    <div className='on'>
                                        <Typography>On</Typography>
                                    </div>
                                    <div className='intervalloptions'>
                                        <FormControl sx={{ m: 1, width: '38ch' }} variant="outlined">
                                            <OutlinedInput
                                                size="small"
                                                id="outlined-adornment-weight"
                                                //  value={values.weight}
                                                //  onChange={handleChange('weight')}
                                                endAdornment={<InputAdornment position="end"> in sec</InputAdornment>}
                                                aria-describedby="outlined-weight-helper-text"
                                                inputProps={{
                                                    'aria-label': 'weight',
                                                }}
                                            />
                                            <FormHelperText id="outlined-weight-helper-text">Shutdown works only one time!</FormHelperText>
                                        </FormControl>
                                    </div>
                                </div>
                                            */}





                            </div>







                        </Box >

                    </div >

                    : <div>

                    </div>
                }





                <ToastContainer />


            </div >
        )
    }
}
