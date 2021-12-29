import React, { Component } from 'react'
import { useLocation } from "react-router-dom"
import axios from "axios";
import './homepage.css'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { DropdownButton } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import ListItemButton from '@mui/material/ListItemButton';
import { Link } from 'react-router-dom';


import { Dialog, DialogContentText, TextField, DialogTitle, DialogContent, DialogActions, Input } from '@mui/material';
import { Button } from 'react-bootstrap';
import SimpleDialog from './SimpleDialog';




async function signUp(email, password, name, phonenumber) {
    try {
        const signUpDetails = {
            name: name,
            email: email,
            phonenumber: phonenumber,
            password: password
        };
        const response = await axios.post('http://localhost:5000/user/register', signUpDetails)
        //console.log(response.data)
    } catch (err) {
        console.error("error while Signing Up is  ", err)
    }
}

async function signIn(email, password) {
    try {
        const signInDetails = {
            email: email,
            password: password
        };
        const response = await axios.post('http://localhost:5000/user/login', signInDetails)
        console.log("the data is of walidddddd ", response.data)
    } catch (err) {
        console.error("error while Signing In is  ", err)
    }
}






async function showStreams() {
    //console.log("its working");
    const url = 'http://localhost:8000/show_streams'
    try {
        const response = await axios(url);
        const data = await response.data;
        //   const walid = await data.length
        /*
          //  alert(data)
          //  console.log(data)ss
          */
        return data.length
        console.log(data.length)
    } catch (err) {
        console.error(`Error is -->  ${err}`)
        return 0
    }
}


function walid(a, b) {
    return a + b
}


function mina() {
    new Promise((resolve, reject) => {
        resolve(5)
    })
}

async function numberofcreatedstreams() {
    const url = 'http://localhost:8000/show_streams';
    const response = await axios(url);
    const data = await response.data;
    const khara = await data.length;
    return khara
}



async function shutDown(id) {
    const response = await fetch(`http://localhost:8000/shutdown_stream/${id}`);

    //  alert("its now shutDown succesfulyys");

}
async function recover(id) {
    const response = await fetch(`http://localhost:8000/recover_stream_snapshot/${id}`);
    //  alert("stream recovered successfully");
}

async function showStreamInfo(id) {
    const response = await axios(`http://localhost:8000/stream_info/${id}`);
    const data = await response.data;
    alert(data);
}



async function insertEvent(id, timeStamp) {
    try {
        let eventDetails = `
        {"t1":${timeStamp},"payload":{"U16":65}}`
        const response = await axios.post(`http://localhost:8000/insert_ordered/${id}`, eventDetails);

        const data = await response.data;
        console.log("ddddddddddddddddddddddd ", data);
        alert(data)
    } catch (e) {
        //console.log(e)
        console.error(e)
        alert(e)
    }

}






export default class Homepage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // id: numberofcreatedstreams()
            id: [],
            open: false,
            index: 0,
            streamcreated: false


        }
    }


    fetchData = () => {
        fetch('http://localhost:8000/show_streams')
            .then(response => response.json())
            .then(data => this.setState({ id: data }));

    }

    updatestreamcreated = () => {

        const mina = this.state.id;

        if (mina.length !== 0) {
            this.setState({
                streamcreated: true

            }

            )
        }
    }


    componentDidMount() {

        setInterval(() => {
            this.fetchData()
            this.updatestreamcreated()
        }, 500);

    }

    handleClickOpen = (id) => {

        this.setState({
            open: true,
            index: id

        }, () => {
            console.log('River Threads:', this.state.open)

        }
        )
    }


    handleClose = () => {

        this.setState({
            open: false

        }, () => {
            console.log('River Threads:', this.state.open)

        }
        )
    }


    insertEvent = () => {

        this.setState({
            open: false

        })

    }











    render() {

        const Listofallstream = this.state.id
        console.log(Listofallstream)
        const sindlistofallstreamsleer = this.state.streamcreated;



        return (
            <div className='Streamclass' >

                <h1>All Streams :</h1>
                <Link to={{
                    pathname: "/CreateStream",

                }}>
                    <button type="button" name='WWalid' className='createStreambutton' >
                        Create Stream
                    </button>
                </Link>



                <div>
                    <table className="streams" >



                        <th>ID</th>

                        <th>Status</th>






                    </table>





                    {sindlistofallstreamsleer ?


                        <div>
                            {

                                Listofallstream.map((items, index) => {
                                    return (
                                        <ul id="myUL">

                                            <li key={items.id}>
                                                <div className='iddiv'>{items[0]}</div>
                                                <div className='statusdiv' >{items[1]}</div>
                                                <div className='buttonsdiv' >
                                                    <button className='close' onClick={() => shutDown(index)} > Shutdown</button>
                                                    <button className='close1' onClick={() => recover(index)} > recover</button>
                                                    <button className='close2' onClick={() => showStreamInfo(index)} > show Stream Info</button>


                                                    <Dropdown className='dropdownbutton' >
                                                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='dropdownbutton'>
                                                            More
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu className='dropdown-content'>
                                                            <Dropdown.Item variant="outlined" onClick={() => this.handleClickOpen(index)} href="">Insert Ordered  </Dropdown.Item>
                                                            <Dropdown.Item href="">Insert Ordered Array</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => this.updatestreamcreated()} href="">Query Time Travel</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>




                                                    <Dialog open={this.state.open} onClose={this.handleClose} maxWidth='md' fullScreen fullWidth='md' >
                                                        <DialogTitle>Insert Event</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText>
                                                                <h1> Stream {this.state.index} </h1>
                                                            </DialogContentText>

                                                            <TextField

                                                                required
                                                                id="outlined-required"
                                                                label="TimeStamp"
                                                                defaultValue="0"
                                                                fullWidth='md'
                                                                maxWidth="md"
                                                                autoFocus
                                                                margin="dense"

                                                            />
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={this.handleClose}>Cancel</Button>
                                                            <Button onClick={() => insertEvent(this.state.index, 9)}>Insert</Button>
                                                        </DialogActions>
                                                    </Dialog>

                                                </div>
                                            </li>
                                        </ul>

                                    );
                                })
                            }
                        </div>



                        : <div>
                            <h1>Welcome to our Website</h1>
                            <h1> There are No Streams created. </h1>
                            <h1>Please press on "Create Stream" Button to create your first Stream </h1>
                        </div>

                    }



                </div>
                {/* <button onClick={signUp("waliddd.net", "12333", "waliii", "011215458454")}>SignUp</button> */}
                <button onClick={signIn("waliddd.net", "12333")}>SignIn</button>




                {/*  <button onClick={this.fetchUserEmail()}>Fetch Email</button>*/}
            </div >
        )
    }


}




