import { FaceRetouchingOffSharp, Stream } from '@mui/icons-material';
import React, { Component } from 'react'
import { Dialog, DialogContentText, TextField, DialogTitle, DialogContent, DialogActions, } from '@mui/material';
import { Button } from 'react-bootstrap';
import './java.css'
import { ToastContainer, toast } from 'react-toastify';

const axios = require('axios')



const typeoptions = [
    {
        label: "BOOLEAN",
        value: "BOOLEAN"
    },
    {
        label: "BYTE",
        value: "BYTE"
    },
    {
        label: "SHORT",
        value: "SHORT"
    },
    {
        label: "INTEGER",
        value: "INTEGER"
    },
    {
        label: "LONG",
        value: "LONG"
    },
    {
        label: "FLOAT",
        value: "FLOAT"
    },
    {
        label: "DOUBLE",
        value: "DOUBLE"
    },
    {
        label: "STRING",
        value: "STRING"
    },
    {
        label: "GEOMETRY",
        value: "GEOMETRY"
    }

]


const trueOrFalse = [
    {
        label: "False",
        value: "False"
    },
    {
        label: "True",
        value: "True"
    }
]


const ServerConnected = () => {
    toast.success('Server is running ', {
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

const ServerNotRunning = () => {
    toast.error(' Server is not running', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        ArrayOfAttributes: []
    });
}





function createStreamwithJava(streamName, schemaName, schemaType, Nullable, LightweightIndex) {
    //  console.log("its working");
    try {
        const url = 'https://dbs-demo.mathematik.uni-marburg.de/native/create-stream'
        let request = `{
            "streamName": ${streamName},
            "schema": [
              {
                "name": ${schemaName},
                "type": ${schemaType},
                "properties": {
                  "nullable": ${Nullable},
                  "index": ${LightweightIndex}
                }
              },
              {
                "name": "Y",
                "type": "DOUBLE",
                "properties": {
                  "nullable": false,
                  "index": true
                }
              }
            ]
          }`
        const response = axios.post(url, request)
        console.log("it worked", response.data)
        alert("it worked" + response.data)

    } catch (error) {
        alert(error)
    }
}
// https://dbs-demo.mathematik.uni-marburg.de/native/stream-info
async function streamInfo(streamName) {
    //  console.log("its working");
    try {
        const url = 'https://dbs-demo.mathematik.uni-marburg.de/native/stream-info'
        //     let request = `{
        //     "name": ${streamName}
        //  }`
        //const response = await axios.post(url, request)
        const res = await axios(url, {
            params: {
                name: streamName
            }
        })
        //console.log(res)
        //alert(JSON.stringify(res))
        const data1 = await res.data;
        alert(JSON.stringify(data1))
    } catch (error) {
        console.error(error)
        alert(error)
    }
}
// https://dbs-demo.mathematik.uni-marburg.de/native/query


async function query(queryString, startTime, endTime) {

    try {
        const url = 'https://dbs-demo.mathematik.uni-marburg.de/native/query'
        let request = `{
            "queryString":${queryString},
            "startTime": ${startTime},
            "endTime": ${endTime}
     }`
        const response = await axios.post(url, request)
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}
//{

async function insertEvent(streamName, events) {

    try {
        const url = 'https://dbs-demo.mathematik.uni-marburg.de/native/insert'
        let request = `{
            "streamName": ${streamName},
            "events": ${events}
          }`
        const response = await axios.post(url, request)
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}

async function insertEventS(queryString) {
    try {
        const url = 'https://dbs-demo.mathematik.uni-marburg.de/native/schema'
        let request = `{
            "queryString": ${queryString}
          }`
        const response = await axios.post(url, request)
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}



export default class Java extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Streams: [],
            CreateStreamDialog: false,
            StreamName: "",
            AttributeName: "",
            StreamType: "",
            Nullable: false,
            LightweightIndex: false,
            InsertDialog: false,
            QueryDialog: false,
            streamNameInInsertDialog: "",
            StreamNameInQueryDialog: "",
            ArrayOfAttributes: [],
            SchemaDialog: false,
            SqlSchemaQuery: "",
            resultOfShemaQuery: "",
            xValue: 0.0,
            yValue: 0.0,
            tStart: 0,
            ArrayofEvents: [],
            QueryString: ""
        }
    }
    OpenCreateStreamDialog = (id) => {
        this.setState({
            CreateStreamDialog: true,

        })
    }


    InsertTOAttributesArray = (name, type, nullable, index) => {
        this.state.ArrayOfAttributes.push(`
{
    "name":"${name}",
    "type":"${type}",
    "properties" : {
         "nullable" : ${nullable},
          "index" : ${index}
     }
}`)

    }

    InsertToEventArray = (xValue, yValue, tStart) => {

        this.state.ArrayofEvents.push(`
{
    "X" : ${xValue},
    "Y" : ${yValue},
    "TSTART" : ${tStart}
}
`)
    }






    closeCreateStreamDialog = () => {
        this.setState({
            CreateStreamDialog: false,
            ArrayOfAttributes: []
        }
        )
    }


    OpenInsertDialog = (streamName) => {

        this.setState({
            streamNameInInsertDialog: streamName,
            InsertDialog: true

        }, () => {
            // alert(this.state.StreamNameInInsertDialog)
        }
        )
        this.state.StreamNameInInsertDialog = streamName
    }


    closeInsertDialog = () => {
        this.setState({
            InsertDialog: false,

        }
        )
    }


    OpenSchemaDialog = () => {
        this.setState({
            SchemaDialog: true,

        }
        )
    }

    changeSqlSchemaQuery = event => {
        this.setState({
            SqlSchemaQuery: event.target.value
        },
            () => {
                // alert(this.state.SqlSchemaQuery)
            })
    }

    closeSchemaDialog = () => {
        this.setState({
            SchemaDialog: false
        })
    }

    OpenQueryDialog = (streamName) => {
        this.setState({

            StreamNameInQueryDialog: streamName,
            QueryDialog: true
        })
        this.state.StreamNameInQueryDialog = streamName
    }
    closeQueryDialog = () => {
        this.setState({
            QueryDialog: false,

        }
        )
    }



    changeNullable = event => {
        this.setState({
            Nullable: event.target.value,
        }, () => {
            //   alert(this.state.Nullable)
        }
        )
    }

    changeQueryString = event => {
        this.setState({
            QueryString: event.target.value
        }, () => {
            alert(this.state.QueryString)
        }
        )
    }


    changeLightweightIndex = event => {
        this.setState({
            LightweightIndex: event.target.value,
        }, () => {
            //   alert(this.state.LightweightIndex)
        }
        )
    }


    checkPing = () => {
        this.pingTest()

    }

    pingTest = async () => {
        const fetch1 = await fetch('https://dbs-demo.mathematik.uni-marburg.de/native')
        if (JSON.stringify(fetch1.status) === "200") {
            ServerConnected();
        } else {
            ServerNotRunning();
        }
    }




    changeStreamName = event => {

        this.setState({
            StreamName: event.target.value,
        }, () => {
            // alert(this.state.StreamName)
        }
        )
    }

    changeAttributeName = event => {
        this.setState({
            AttributeName: event.target.value
        })
    }

    changeXvalue = event => {
        this.setState({
            xValue: event.target.value
        },
            () => {
                //     alert(this.state.xValue)
            })
    }
    changeYvalue = event => {
        this.setState({
            yValue: event.target.value
        },
            () => {
                //   alert(this.state.yValue)
            })
    }

    changeTStart = event => {
        this.setState({
            tStart: event.target.value
        },
            () => {
                //       alert(this.state.tStart)
            })
    }




    changeSchemaType = event => {
        this.setState({
            StreamType: event.target.value
        }, () => {
            //    alert(this.state.StreamType)
        }
        )
    }



    fetchDataJava = async () => {
        const fetch1 = await fetch('https://dbs-demo.mathematik.uni-marburg.de/native/get-streams')
        const response1 = await fetch1.json()
        this.setState({ Streams: response1 });
        //  alert(response1)
    }


    async componentDidMount() {
        setInterval(() => {
            this.fetchDataJava();
        }, 1000);
    }



    render() {


        const Listofallstream = this.state.Streams
        return (
            <div className='maindiv'>

                <div className="TableJavadiv" >
                    <div className="TableStreamName"  ><h2>Stream Name</h2></div>
                    <div className="TableCreateStream"  ><button className='CreateStreamButton' onClick={this.OpenCreateStreamDialog}>Create Stream</button>
                        <button onClick={() => this.checkPing()} className='Pingbutton'>Ping</button>
                        <button onClick={() => this.OpenSchemaDialog()} className='Schemabutton'>Schema</button>
                    </div>

                </div>



                <div className='listsOfStreams'>
                    {
                        Listofallstream.map((streamName, index) => {
                            return (
                                <ul className="a">

                                    <li key={streamName.id}>

                                        <div className='StreamNames'>{streamName}</div>


                                        <div className="buttonsdiv" >

                                            <button onClick={() => this.OpenInsertDialog(streamName)} className='InsertButton'> Insert</button>
                                            <button onClick={() => this.OpenQueryDialog(streamName)} className='Query'> Query</button>
                                            <button onClick={() => streamInfo(streamName)} className='StreamInfoButton'> Stream info</button>

                                        </div>

                                    </li>
                                </ul>

                            );
                        })
                    }
                </div>


                <Dialog open={this.state.CreateStreamDialog}
                    onClose={this.closeCreateStreamDialog}
                    fullWidth="lg"
                    maxWidth="lg" >
                    <DialogTitle>Create Stream:</DialogTitle>
                    <DialogContent>
                        <DialogContentText>

                        </DialogContentText>
                        <TextField
                            onChange={this.changeStreamName}
                            required
                            id="outlined-required"
                            label="Stream Name"
                            defaultValue="0"
                            fullWidth='md'
                            maxWidth="md"
                            autoFocus
                            margin="dense"

                        />
                        <TextField
                            onChange={this.changeAttributeName}
                            sx={{ m: 1, width: '63ch' }}
                            required
                            id="outlined-required"
                            label="Name"
                            defaultValue="0"
                            fullWidth='md'
                            maxWidth="md"
                            autoFocus
                            margin="dense"
                            helperText="Attribute Name!"

                        />


                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Type: "
                            sx={{ m: 1, width: '63ch' }}
                            onChange={this.changeSchemaType}

                            SelectProps={{
                                native: true,
                            }}

                        >
                            {typeoptions.map((option) => (
                                <option value={option.label}>{option.value}</option>
                            ))}
                        </TextField>

                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Nullable: "
                            sx={{ m: 1, width: '63ch' }}
                            onChange={this.changeNullable}

                            SelectProps={{
                                native: true,
                            }}

                        >
                            {trueOrFalse.map((option) => (
                                <option value={option.label}>{option.value}</option>
                            ))}
                        </TextField>

                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Lightweight Index: "
                            sx={{ m: 1, width: '63ch' }}
                            onChange={this.changeLightweightIndex}

                            SelectProps={{
                                native: true,
                            }}

                        >
                            {trueOrFalse.map((option) => (
                                <option value={option.label}>{option.value}</option>
                            ))}
                        </TextField>

                        <TextField
                            id="outlined-read-only-input"
                            label="Attributes"
                            multiline
                            maxRows={6}
                            sx={{ m: 1, width: '130ch' }}


                            variant="filled"
                            helperText="Array of Attributes"
                            value={this.state.ArrayOfAttributes}
                        />



                    </DialogContent>
                    <DialogActions>
                        <Button className="AddAttribute" onClick={() => this.InsertTOAttributesArray(this.state.AttributeName, this.state.StreamType, this.state.Nullable, this.state.LightweightIndex)} >Add Attribute</Button>
                        <Button className="CreateStreamButtonInDialog">CreateStream</Button>
                        <Button onClick={this.closeCreateStreamDialog} className="closeDialogButton">Close</Button>

                    </DialogActions>
                </Dialog>


                <Dialog open={this.state.InsertDialog}
                    onClose={this.closeInsertDialog}
                    fullWidth="lg"
                    maxWidth="lg" >
                    <DialogTitle></DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <h1> Stream Name: {this.state.StreamNameInInsertDialog} </h1>
                        </DialogContentText>

                        <TextField
                            onChange={this.changeXvalue}
                            required
                            sx={{ m: 1, width: '63ch' }}
                            id="outlined-required"
                            label="X"
                            defaultValue="0"
                            fullWidth='md'
                            maxWidth="md"
                            autoFocus
                            margin="dense"

                        />
                        <TextField
                            onChange={this.changeYvalue}
                            sx={{ m: 1, width: '63ch' }}
                            required
                            id="outlined-required"
                            label="Y"
                            defaultValue="0"
                            fullWidth='md'
                            maxWidth="md"
                            autoFocus
                            margin="dense"

                        />
                        <TextField
                            onChange={this.changeTStart}
                            sx={{ m: 1, width: '63ch' }}
                            required
                            id="outlined-required"
                            label="TStart"
                            defaultValue="0"
                            fullWidth='md'
                            maxWidth="md"
                            autoFocus
                            margin="dense"

                        />


                        <TextField
                            id="outlined-read-only-input"
                            label="Events"
                            multiline
                            maxRows={6}
                            sx={{ m: 1, width: '130ch' }}


                            variant="filled"
                            helperText="Added Events"
                            value={this.state.ArrayofEvents}
                        />





                    </DialogContent>
                    <DialogActions>
                        <Button className="CreateStreamButtonInDialog">Insert</Button>
                        <Button onClick={() => this.InsertToEventArray(this.state.xValue, this.state.yValue, this.state.tStart)} className="AddAttribute">Add to Array</Button>
                        <Button onClick={this.closeInsertDialog} className="closeDialogButton">Close</Button>

                    </DialogActions>
                </Dialog>

                <Dialog open={this.state.QueryDialog}
                    onClose={this.closeQueryDialog}
                    fullWidth="lg"
                    maxWidth="lg" >
                    <DialogTitle></DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <h1> Stream Name: {this.state.StreamNameInQueryDialog} </h1>

                        </DialogContentText>


                        <TextField
                            onChange={this.changeQueryString}
                            required
                            id="outlined-required"
                            label="Stream Name"
                            defaultValue="0"
                            fullWidth='md'
                            maxWidth="md"
                            autoFocus
                            margin="dense"

                        />




                    </DialogContent>
                    <DialogActions>

                        <Button onClick={this.closeQueryDialog} className="closeDialogButton">Close</Button>

                    </DialogActions>
                </Dialog>



                <Dialog open={this.state.SchemaDialog}
                    onClose={this.closeInsertDialog}
                    fullWidth="lg"
                    maxWidth="lg" >
                    <DialogTitle></DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <h1> Please Enter SQL Query</h1>
                        </DialogContentText>


                        <TextField
                            id="outlined-read-only-input"
                            label="QueryString"
                            multiline
                            maxRows={6}
                            sx={{ m: 1, width: '130ch' }}
                            onChange={this.changeSqlSchemaQuery}
                            variant="filled"
                            helperText=""
                            value={this.state.SqlSchemaQuery}
                        />

                        <TextField
                            id="outlined-read-only-input"
                            label="Result"
                            multiline
                            maxRows={6}
                            sx={{ m: 1, width: '130ch' }}


                            variant="filled"
                            helperText="Here will be the answered shown"
                            value={this.state.resultOfShemaQuery}
                        />



                    </DialogContent>
                    <DialogActions>

                        <Button className="ExcuteSchemaButton">Execute</Button>
                        <Button onClick={this.closeSchemaDialog} className="closeDialogButton">Close</Button>



                    </DialogActions>
                </Dialog>





                <ToastContainer />
            </div>
        )
    }
}
