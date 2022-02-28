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






function mina(params) {

    alert("Walid");

}

function walid(params) {
    setInterval(() => {
        alert("Walid");
    }, 1000);
}



async function shutDown(id) {
    const response = await fetch(`http://localhost:8000/shutdown_stream/${id}`);

    //  alert("its now shutDown succesfulyys");

}





export default class Jobs extends Component {


    constructor(props) {
        super(props)


        this.state = {
            arrayOFIdCurrenUser: [],
            choosenStream: "",
            showbox: false,
            shutdownswitch: false,
            Timershutdown: 0,
            systemLoadSwitch: false,
            systemLoadTimer: 0,
            disableddt: false
        }
    }





    shutdown2 = async () => {




        try {
            const response = await fetch(`http://localhost:8000/shutdown_stream/${this.state.choosenStream}`)

            this.setState({
                disabledd: true
            })

        } catch (err) {
            console.error(`Error is -->  ${err}`)

        }


    }


    shutdown = async () => {
        let choosenstream = this.state.choosenStream;
        let Timershutdown1 = this.state.Timershutdown * 1000
        setTimeout(this.shutdown2,


            Timershutdown1);
        this.setState({
            shutdownswitch: !this.state.shutdownswitch
        })
    }



    systemLoad = async () => {
        let choosenstream = this.state.choosenStream;
        let systemLoadTimer1 = this.state.systemLoadTimer
        setInterval(function () { const response = fetch(`http://localhost:8000/system_load`) }, systemLoadTimer1);
        this.setState({
            systemLoadSwitch: !this.state.systemLoadSwitch
        })
    }







    selectStream = event => {
        this.setState({
            choosenStream: event.target.value
        }, () => {
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



    setTimerShutdown = event => {
        this.setState({
            Timershutdown: event.target.value
        })
    }



    setTimerSystemload = event => {
        this.setState({
            systemLoadTimer: event.target.value * 1000
        })
    }





    getArrayOFStreamsIdOFTHeCurrentUser = async (id) => {
        try {
            const url = await `http://localhost:5000/user/streamperuser?user_id=${id}`
            const response = await axios(url);
            const data = await response.data;
            /* 
             data.forEach(element => {
                 this.state.arrayOFIdCurrenUser.push(element)
             });
             */

            data.unshift('')




            this.setState({


                arrayOFIdCurrenUser: data
            }, () => {
                //   alert(this.state.arrayOFIdCurrenUser)
            }
            )


        } catch (err) {
            alert(err)
            console.error(`Error is -->  ${err}`)
        }
    }














    componentDidMount() {
        setInterval(() => {
            this.getArrayOFStreamsIdOFTHeCurrentUser(Cookies.get('UserID'))

        }, 1000)
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
                                <div className="listdiv">
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
                                            <OutlinedInput
                                                size="small"
                                                id="outlined-adornment-weight"
                                                value={this.state.Timershutdown}
                                                onChange={this.setTimerShutdown}
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
                                <div className="listdiv">
                                    <div className='jobtype1'  >
                                        <h2 className='JobName'>System Load:</h2>
                                    </div>
                                    <div className='off'>
                                        <Typography>Off</Typography>
                                    </div>
                                    <div className='switch'>
                                        <FormControlLabel disabled={this.state.disabledd} checked={this.state.systemloadswitch} onChange={this.systemLoad} control={<Switch />} label="" className='chechlog' />
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
                                            disabled={this.state.disabledd}
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





                            </div>







                        </Box >

                    </div >

                    : <div>

                    </div>
                }
            </div >
        )
    }
}
