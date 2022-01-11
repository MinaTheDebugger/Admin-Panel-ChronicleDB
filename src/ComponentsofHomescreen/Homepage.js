import React, { Component } from 'react'
import axios from "axios";
import './homepage.css'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Dialog, DialogContentText, TextField, DialogTitle, DialogContent, DialogActions, Input } from '@mui/material';
import { Button } from 'react-bootstrap';

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

async function shutDown(id) {
    const response = await fetch(`http://localhost:8000/shutdown_stream/${id}`);

    //  alert("its now shutDown succesfulyys");

}

async function recover(id) {
    const response = await fetch(`http://localhost:8000/recover_stream_snapshot/${id}`);
    //  alert("stream recovered successfully");
}


async function show_QueryTime(id, exklusivOrInklusiv, start, end) {



    //console.log("its working");
    const url = `http://192.168.137.89:8000/query_time_travel/${id}`
    // exklusivOrInklusiv is boolean , falls es true ist dann ist es inklusiv // 
    // if exklusivOrInklusiv false ist , ist es exklusiv
    function getInklusivOrExklusiv(exklusivOrInklusiv) {
        return (exklusivOrInklusiv ? `"Inclusive"` : `"Exclusive"`);
    }
    const jsonBody = `{ ${getInklusivOrExklusiv(exklusivOrInklusiv)} : {"start" : ${start} , "end": ${end}}}`
    //toDo  change URL with the one from Localhost (From the Rust-Project)
    try {
        const response = await axios.post(url, jsonBody);
        const data = await response.data;
        alert(data + "ist gut")
        console.log(data)
    } catch (err) {
        console.error(`Error is -->  ${err}`)
        alert(jsonBody + " ist nicht gut")


    }
}

export default class Homepage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // id: numberofcreatedstreams()
            id: [],
            InsertOrderDialog: false,
            QueryTimeTravelDialog: false,
            index: 0,
            istherestreamcreated: false,
            timeStamp: 0,
            systeminfoopendialog: false,
            systeminfo: '',
            eventType: "U8",
            dataofevent: '0',
            rawtype: "",
            consttype: "",
            vartype: "",
            queryTimeStart: 0,
            queryTimeEnd: 0,
            exclusiveorinclusive: true
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
                istherestreamcreated: true
            }
            )
        }
    }


    componentDidMount() {
        setInterval(() => {
            this.fetchData()
            this.updatestreamcreated()
        }, 1000);
    }

    OpenIsertOrderDialog = (id) => {
        this.setState({
            InsertOrderDialog: true,
            index: id
        })
    }


    OpenQueryTimeTravelDialog = (id) => {
        this.setState({
            QueryTimeTravelDialog: true,
            index: id
        })

    }


    OpenSysteminfoDialog = async (id) => {

        const response = await axios(`http://localhost:8000/stream_info/${id}`);
        const data1 = await response.data;
        this.setState({
            systeminfoopendialog: true,
            index: id,
            systeminfo: data1
        })
    }

    closeInsertOrderDialog = () => {
        this.setState({
            InsertOrderDialog: false
        }
        )
    }

    closeQueryTimeTravelDialog = () => {

        this.setState({
            QueryTimeTravelDialog: false

        }
        )

    }



    closeSysteminfoDialog = () => {

        this.setState({
            systeminfoopendialog: false

        }
        )
    }


    changeTimeStamp = event => {

        this.setState({
            timeStamp: event.target.value,
        }, () => {
            console.log('timeStamp', this.state.timeStamp)
        }
        )
    }

    changeQueryTimeStart = event => {

        this.setState({
            queryTimeStart: event.target.value,
        }, () => {
            console.log('Query Time Start', this.state.timeStamp)
        }
        )
    }
    changeQueryTimeEnd = event => {

        this.setState({
            queryTimeEnd: event.target.value,
        }, () => {
            console.log('Query Time End', this.state.timeStamp)
        }
        )
    }






    showStreamInfo = async (id) => {
        const response = await axios(`http://localhost:8000/stream_info/${id}`);
        const data = await response.data;
        alert(data)
    }


    insertEvent = async (id, timeStamp, eventType, dataofevent) => {
        try {
            let eventDetails = `
   {"t1":${timeStamp},"payload":{"${eventType}":${dataofevent}}}`
            const response = await axios.post(`http://localhost:8000/insert_ordered/${id}`, eventDetails);

            const data = await response.data;
            console.log("ddddddddddddddddddddddd ", data);
            this.setState({
                InsertOrderDialog: false,


            })

        } catch (e) {
            //console.log(e)
            console.error(e)
            alert("Please the Data correctly")
        }
    }



    changedataofevent = event => {

        this.setState({
            dataofevent: event.target.value,
        }, () => {
            console.log('dataofevent', this.state.dataofevent)

        }
        )
    }




    changeraw = event => {

        if (event.target.value != "") {
            this.setState({
                rawtype: event.target.value,
                consttype: "",
                vartype: "",
                eventType: event.target.value
            })
        }
        else {

            this.setState({
                rawtype: event.target.value,



            }, () => {
                console.log('eventType2', this.state.eventType)

            }
            )
        }
    }


    changeconst = event => {

        if (event.target.value != "") {
            this.setState({
                consttype: event.target.value,
                rawtype: "",
                vartype: "",
                eventType: event.target.value
            })
        }
        else {

            this.setState({
                consttype: event.target.value,



            }, () => {
                console.log('eventType', this.state.eventType)

            }
            )
        }


    }


    changevar = event => {

        if (event.target.value != "") {
            this.setState({
                vartype: event.target.value,
                rawtype: "",
                consttype: "",
                eventType: event.target.value
            })
        }
        else {

            this.setState({
                vartype: event.target.value,



            }, () => {
                console.log('eventType', this.state.eventType)

            }
            )
        }

    }


    chooseexclusiveorinclusive = event => {


        this.setState({
            exclusiveorinclusive: event.target.value,
        }
        )


    }

    render() {

        const Listofallstream = this.state.id
        console.log(Listofallstream)
        const sindlistofallstreamsleer = this.state.istherestreamcreated;



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
                                                    <button className='close2' onClick={() => this.OpenSysteminfoDialog(index)} > show Stream Info</button>


                                                    <Dropdown className="d-inline mx-2" >
                                                        <Dropdown.Toggle variant="success" className='dropdownbutton' id="dropdown-autoclose-true">
                                                            More
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu title="Dropdown button" id="dropdown-basic-button" as={ButtonGroup} variant="dark" className="dropdown-content">

                                                            <Dropdown.Item variant="outlined" onClick={() => this.OpenIsertOrderDialog(index)} href="">Insert Ordered </Dropdown.Item>
                                                            <Dropdown.Item href="">Insert Ordered Array</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => this.OpenQueryTimeTravelDialog(index)} href="">Query Time Travel</Dropdown.Item>
                                                        </Dropdown.Menu>

                                                    </Dropdown>




                                                    <Dialog open={this.state.InsertOrderDialog} onClose={this.closeInsertOrderDialog} maxWidth='md' fullWidth='md' fullScreen  >
                                                        <DialogTitle>Insert Event</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText>
                                                                <h1> Stream {this.state.index} </h1>
                                                            </DialogContentText>

                                                            <TextField
                                                                onChange={this.changeTimeStamp}
                                                                required
                                                                id="outlined-required"
                                                                label="TimeStamp"
                                                                defaultValue="0"
                                                                fullWidth='md'
                                                                maxWidth="md"
                                                                autoFocus
                                                                margin="dense"

                                                            />


                                                            <FormControl sx={{ m: 1, minWidth: 450 }}>
                                                                <InputLabel htmlFor="grouped-native-select" >Raw</InputLabel>
                                                                <Select native defaultValue="" id="grouped-native-select" label="Grouping" onChange={this.changeraw} value={this.state.rawtype} >
                                                                    <option aria-label="None" value="" />


                                                                    <optgroup label="Unsigned Integer">
                                                                        <option value={"U8"}>U8</option>
                                                                        <option value={"U16"}>U16</option>
                                                                        <option value={"U32"}>U32</option>
                                                                        <option value={"U64"}>U64</option>
                                                                    </optgroup>
                                                                    <optgroup label="Integer">
                                                                        <option value={"I8"}>I8</option>
                                                                        <option value={"I16"}>I16</option>
                                                                        <option value={"I32"}>I32</option>
                                                                        <option value={"I64"}>I64</option>
                                                                    </optgroup>
                                                                    <optgroup label="Float">
                                                                        <option value={"F32"}>F32</option>
                                                                        <option value={"F64"}>F64</option>
                                                                    </optgroup>
                                                                </Select>
                                                            </FormControl>












                                                            <FormControl sx={{ m: 1, minWidth: 450 }}>
                                                                <InputLabel htmlFor="grouped-native-select">Const</InputLabel>
                                                                <Select native defaultValue="" id="grouped-native-select" label="Grouping" onChange={this.changeconst} value={this.state.consttype} >
                                                                    <option aria-label="None" value="" />
                                                                    <optgroup label="String">
                                                                        <option value={"ConstString"}>ConstString</option>

                                                                    </optgroup>
                                                                    <optgroup label="Unsigned Integer-List">
                                                                        <option value={"ConstU8List"}>ConstU8List</option>
                                                                        <option value={"ConstU16List"}>ConstU16List</option>
                                                                        <option value={"ConstU32List"}>ConstU32List</option>
                                                                        <option value={"ConstU64List"}>ConstU64List</option>
                                                                    </optgroup>
                                                                    <optgroup label="Integer-List">
                                                                        <option value={"ConstI8List"}>ConstI8List</option>
                                                                        <option value={"ConstI16List"}>ConstI16List</option>
                                                                        <option value={"ConstI32List"}>ConstI32List</option>
                                                                        <option value={"ConstI64List"}>ConstI64List</option>
                                                                    </optgroup>
                                                                    <optgroup label="Float-List">
                                                                        <option value={"ConstF32List"}>ConstF32List</option>
                                                                        <option value={"ConstF64List"}>ConstF64List</option>

                                                                    </optgroup>
                                                                </Select>
                                                            </FormControl>

                                                            <FormControl sx={{ m: 1, minWidth: 450 }}>
                                                                <InputLabel htmlFor="grouped-native-select" >Var</InputLabel>
                                                                <Select native defaultValue="" id="grouped-native-select" label="Grouping" onChange={this.changevar} value={this.state.vartype} >
                                                                    <option aria-label="None" value="" />
                                                                    <optgroup label="String">
                                                                        <option value={"VarString"}>VarString</option>

                                                                    </optgroup>

                                                                    <optgroup label="Unsigned Integer-List">
                                                                        <option value={"VarU8List"}>UVarU8List</option>
                                                                        <option value={"VarU16List"}>VarU16List</option>
                                                                        <option value={"VarU32List"}>VarU32List</option>
                                                                        <option value={"VarU64List"}>VarU64List</option>
                                                                    </optgroup>
                                                                    <optgroup label="Integer-List">
                                                                        <option value={"VarI8List"}>VarI8List</option>
                                                                        <option value={"VarI16List"}>VarI16List</option>
                                                                        <option value={"VarI32List"}>VarI32List</option>
                                                                        <option value={"VarI64List"}>VarI64List</option>
                                                                    </optgroup>
                                                                    <optgroup label="Float">
                                                                        <option value={"VarF32List"}>VarF32List</option>
                                                                        <option value={"VarF64List"}>VarF64List</option>
                                                                    </optgroup>
                                                                </Select>
                                                            </FormControl>

                                                            <TextField
                                                                onChange={this.changedataofevent}
                                                                sx={{ m: 1, width: '80ch' }}
                                                                required
                                                                id="outlined-required"
                                                                label="Data"
                                                                defaultValue="0"
                                                                fullWidth='md'
                                                                maxWidth="md"
                                                                autoFocus
                                                                margin="dense"
                                                                helperText="Please enter data according to the chosen Event type!"

                                                            />



                                                        </DialogContent>



                                                        <DialogActions>
                                                            <Button onClick={() => this.insertEvent(this.state.index, this.state.timeStamp, this.state.eventType, this.state.dataofevent)}>Insert</Button>
                                                            <Button onClick={this.closeInsertOrderDialog}>Close</Button>

                                                        </DialogActions>
                                                    </Dialog>



                                                    <Dialog open={this.state.systeminfoopendialog} onClose={this.closeSysteminfoDialog} fullScreen maxWidth='md' fullWidth='md' >
                                                        <DialogTitle>System Info:</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText>
                                                                <h3> {this.state.systeminfo} </h3>
                                                            </DialogContentText>


                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={this.closeSysteminfoDialog}>Close</Button>

                                                        </DialogActions>
                                                    </Dialog>




                                                    <Dialog open={this.state.QueryTimeTravelDialog} onClose={this.closeQueryTimeTravelDialog} fullScreen maxWidth='md' fullWidth='md' >
                                                        <DialogTitle>Query Time Travel:</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText>
                                                                <h1>Stream {this.state.index} </h1>
                                                            </DialogContentText>













                                                            <TextField
                                                                id="outlined-select-currency-native"
                                                                select
                                                                label="Exclusive or Inclusive:"
                                                                sx={{ m: 1, width: '50ch' }}
                                                                onChange={this.chooseexclusiveorinclusive}

                                                                SelectProps={{
                                                                    native: true,
                                                                }}

                                                            >
                                                                Inclusive
                                                                <option value={"true"}>Inclusive</option>
                                                                <option value={"false"}>Exclusive</option>

                                                            </TextField>

                                                            <TextField
                                                                onChange={this.changeQueryTimeStart}
                                                                sx={{ m: 1, width: '50ch' }}
                                                                required
                                                                id="outlined-required"
                                                                label="Start"
                                                                defaultValue="0"
                                                                fullWidth='md'
                                                                maxWidth="md"
                                                                autoFocus
                                                                margin="dense"
                                                                helperText="Start Time"

                                                            />


                                                            <TextField
                                                                onChange={this.changeQueryTimeEnd}
                                                                sx={{ m: 1, width: '50ch' }}
                                                                required
                                                                id="outlined-required"
                                                                label="End"
                                                                defaultValue="0"
                                                                fullWidth='md'
                                                                maxWidth="md"
                                                                autoFocus
                                                                margin="dense"
                                                                helperText="End Time"

                                                            />


                                                            <TextField
                                                                id="filled-multiline-flexible"
                                                                label="Array[Event]"
                                                                multiline
                                                                maxRows={6}
                                                                sx={{ m: 1, width: '160ch' }}


                                                                variant="filled"
                                                                helperText="The result will be shown here"
                                                            />











                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={() => show_QueryTime(this.state.index, this.state.exclusiveorinclusive, this.state.queryTimeStart, this.state.queryTimeEnd)}> Show Query Time Travel</Button>
                                                            <Button onClick={this.closeQueryTimeTravelDialog}>Close</Button>

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




