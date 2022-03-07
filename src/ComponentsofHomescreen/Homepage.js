import React, { Component } from 'react'
import axios from "axios";
import './homepage.css'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Dialog, DialogContentText, TextField, DialogTitle, DialogContent, DialogActions, } from '@mui/material';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DateTimePicker } from '@mui/lab';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


// Style for the Table of the Jobs in Insert Orderd

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
// Style for the Table of the Jobs in Insert Orderd
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));




// Job period Options
const Jobsperiod = [
    {
        label: 0,
        value: "Just one Time ",
    },
    {
        label: 30,
        value: "30 sec",
    },
    {
        label: 60,
        value: "1 min",
    },
    {
        label: 300,
        value: "5 min",
    },
    {
        label: 600,
        value: "10 min",
    },
    {
        label: 900,
        value: "15 min",
    },
    {
        label: 1800,
        value: "30 min",
    },
    {
        label: 3600,
        value: "1 hour",
    },
    {
        label: 7200,
        value: "2 Hour",
    }
    ,
    {
        label: 7200,
        value: "2 Hour",
    }
    ,
    {
        label: 86.400,
        value: "1 day",
    }
]

// Exxclusive or Inclusive
const ExluciveOrInclusiveOptions = [
    {
        label: "Inclusive",
        value: true,
    },
    {
        label: "Exclusive",
        value: false,
    }
]

//shutdown Function
async function shutDown(id) {
    const response = await fetch(`http://localhost:8000/shutdown_stream/${id}`);
    if (response.status === 200) {
        successShutDownNotify(id)
    }
}

//Recover Stream Funtion

async function recover(id) {
    const response = await fetch(`http://localhost:8000/recover_stream_snapshot/${id}`);

    if (response.status == 200) {
        successRecovernotify(id);
    }

}





//Get Minkey function

async function getMinkey4(id) {
    try {
        const url = await `http://localhost:8000/min_key/${id}`
        const response = await axios(url);
        const data = await response.data;
        //  alert(data)
        if (data === "Empty Index") {
            return "NO"
        } else {
            return await (data)
        }
    } catch (err) {
        console.error(`Error is -->  ${err}`)
        const string2 = "NO"
        return string2

    }
}



//Show rightflank  function
async function ShowRightFlank(id) {

    try {
        const url = await `http://localhost:8000/show_right_flank/${id}`
        const response = await axios(url);
        alert(JSON.stringify(response.data))
        console.log("ressss is" + response.data)
        //   return (data)

    } catch (err) {
        console.error(`Error is -->  ${err}`)


    }
}


//toast when Stream successfully recovered
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


//toast when Order successfully Inserted
const successInserOrderNotify = () => {
    toast.success('Successfully Order  Inserted', {
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
//toast when Order Array successfully Inserted
const successInserOrderArrayNotify = () => {
    toast.success('Successfully Order Array Inserted', {
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






// Toast when Stream successfully shutdown
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




//Toast When job is added

const succesnotify = () => {
    toast.success('Order Added Successfully', {
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

// Toast when no date is selected and the user wants to set a job without date
const errornotify = () => {

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
//Toast when the Event Type is missing
const missingEventTypeNotify = () => {
    toast.error(' Please select a EventType!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

// Get maxkey Funtion
async function getMaxKey(id) {

    try {
        const url = `http://localhost:8000/max_key/${id}`
        const response = await axios(url);
        const data = await response.data;
        if (data === "Empty Index") {
            return "NO"
        } else {
            return await (data)
        }



    } catch (err) {
        console.error(`Error is -->  ${err}`)
        const string2 = "NO"
        return string2

    }
}

// Get tree Height Function
async function getTreeHeight(id) {

    try {
        const url = `http://localhost:8000/tree_height/${id}`
        const response = await axios(url);
        const data = await response.data;

        return await (data)




    } catch (err) {
        console.error(`Error is -->  ${err}`)
        const string2 = "NO"
        return string2

    }
}



export default class Homepage extends Component {
    //Conscructor and the Variable of the class
    constructor(props) {
        super(props)

        this.state = {
            id: [],                                   // store the streams
            InsertOrderDialog: false,                 // to open/close  the insertOrder dialog
            QueryTimeTravelDialog: false,             // to open/close  the Querytime dialog
            index: 0,                                 // to save the id of the stream when working on it
            istherestreamcreated: false,              // to know if the users has already created streams or not
            timeStamp: 0,                             //timestamp
            systeminfoopendialog: false,               //to open systeminfo dialog
            rightflankopendialog: false,               //to open rightflank dialog
            systeminfo: '',
            eventType: "",
            dataofevent: '0',
            rawtype: "",
            consttype: "",
            vartype: "",
            queryTimeStart: 0,
            queryTimeEnd: 0,
            exclusiveorinclusive: true,                     //exclusive or Inclusive
            querytimeResult: '',
            arrayofarrayss: [],
            rightFlankText: '',
            arrayOFIdCurrenUser: [],                       // store ids  of the Streams that belongs to the signedin User
            addMultipleEvents: false,
            EventArray: [],
            errorChoosetype: false,
            dateInsertOrder: '',
            rows: [],
            period: 0

        }
    }



    // Get and Arry of the Id's of the Stream of the logged in User
    getArrayOFStreamsIdOFTHeCurrentUser = async (id) => {
        try {
            const url = await `http://localhost:5000/user/streamperuser?user_id=${id}`
            const response = await axios(url);
            const data = await response.data;

            this.setState({
                arrayOFIdCurrenUser: data
            }, () => {

            }
            )
        } catch (err) {
            alert(err)
            console.error(`Error is -->  ${err}`)
        }
    }



    // This method adds the min key and right key and the tree height to the list of the Streams
    // to be later rendered and shown to the user

    AddkeysandTreeHeigthToStreams = async (list) => {
        if (list.length >= 1) {
            list.forEach(async (e) => {
                let index = e[0];
                let maxkey = await getMaxKey(index)
                let minkey = await getMinkey4(index);
                let treeHeight = await getTreeHeight(index);
                e.push(minkey)
                e.push(maxkey)
                e.push(treeHeight)
                this.state.arrayofarrayss = list
            }
            )
        }
    }


    // This method filters the Streams and just leaves the Streams that are created by the current loggedIn User
    filterStreamsForUser = () => {

        if (Cookies.get('isAdmin') === 'false') {
            let array2 = []

            this.state.id.forEach((element) => {

                if (this.state.arrayOFIdCurrenUser.includes(element[0])) {

                    array2.push(element)

                }
            })
            this.state.id = array2
        }
    }

    // fetch streams from backend
    fetchData = async () => {
        const fetch1 = await fetch('http://localhost:8000/show_streams')
        const response1 = await fetch1.json()
        this.setState({ id: response1 });
    }

    //Reading the Date of the Job entered by the user
    UpdateDateInsertOrder = (newValue) => {
        this.setState({
            dateInsertOrder: newValue
        }, () => {

        })

    }
    // if there streams created allow the user to see them
    updatestreamcreated = () => {
        const mina = this.state.id;
        if (mina.length !== 0) {
            this.setState({
                istherestreamcreated: true
            }
            )
        }
    }


    // this method excute every 1 second
    async componentDidMount() {
        setInterval(() => {
            this.fetchData()    // fetch data
            this.getArrayOFStreamsIdOFTHeCurrentUser(Cookies.get('UserID'))   // get user id of the user
            this.filterStreamsForUser()   // filter the streams
            this.updatestreamcreated()       // show the streams
            this.AddkeysandTreeHeigthToStreams(this.state.id)       // show the minkey and maxkey and tree height to the user

        }, 1000);
    }

    // Open  Order Dialog
    OpenIsertOrderDialog = (id) => {
        this.setState({
            InsertOrderDialog: true,
            index: id
        })
    }

    // Open  Time Traveler Dialog
    OpenQueryTimeTravelDialog = (id) => {
        this.setState({
            QueryTimeTravelDialog: true,
            index: id
        })
    }

    // Open FlankDialog and show results
    openRightFlankDialog = async (id) => {
        const url = await `http://localhost:8000/show_right_flank/${id}`
        const response = await axios(url);
        const data = await response.data;
        this.setState({
            rightFlankText: data,
            rightflankopendialog: true
        })
    }

    // Open SystemInfo Dialog and show resukts
    OpenSysteminfoDialog = async (id) => {
        const response = await axios(`http://localhost:8000/stream_info/${id}`);
        const data1 = await response.data;

        this.setState({
            systeminfoopendialog: true,
            index: id,
            systeminfo: data1
        })
    }


    //show system info results
    ShowSysteminfo = async (id) => {
        const response = await axios(`http://localhost:8000/stream_info/${id}`);
        const data1 = await response.data;
        alert(data1)
    }

    // close ORder dialog 
    closeInsertOrderDialog = () => {
        this.setState({
            InsertOrderDialog: false,
            addMultipleEvents: false,
            EventArray: ""
        }
        )
    }


    // close query Time Traveler dialog 
    closeQueryTimeTravelDialog = () => {
        this.setState({
            QueryTimeTravelDialog: false
        }
        )

    }

    //clsoe Systeminfo dialog

    closeSysteminfoDialog = () => {

        this.setState({
            systeminfoopendialog: false

        }
        )
    }

    //close right flank dialog

    closeRightFlankDialog = () => {

        this.setState({
            rightflankopendialog: false
        })
    }

    // reading time stamp entered by the user
    changeTimeStamp = event => {

        this.setState({
            timeStamp: event.target.value,
        }, () => {
            console.log('timeStamp', this.state.timeStamp)
        }
        )
    }
    // reading Query Start time entered by the user
    changeQueryTimeStart = event => {

        this.setState({
            queryTimeStart: event.target.value,
        }, () => {
            console.log('Query Time Start', this.state.timeStamp)
        }
        )
    }
    // reading Query End time entered by the user
    changeQueryTimeEnd = event => {

        this.setState({
            queryTimeEnd: event.target.value,
        }, () => {
            console.log('Query Time End', this.state.timeStamp)
        }
        )
    }

    // Show hidden Textfeld to allow the user to insert array ordered
    ShowHidenTextAndButton = () => {

        this.setState({
            addMultipleEvents: true
        })
    }
    // SHide the buttons to just enter single event
    HideTextAndButton = () => {
        this.setState({
            addMultipleEvents: false
        })
    }
    // reading the period entered by the user
    changeperiod = event => {
        this.setState({
            period: event.target.value
        }, () => {

        })
    }
    // reading the date entered by the user
    createData = (name, calories, fat) => {
        return { name, calories, fat };
    }

    // insert elements to array to be inserted later as array
    InsertToArray = (id, timeStamp, eventType, dataofevent) => {
        this.state.EventArray.push(`
{"t1":${timeStamp},"payload":{"${eventType}":${dataofevent}}}`)

    }
    // set insert order or insert ordered array as job
    setScheduleInsertOrder = () => {
        var secondBetweenTwoDate = Math.abs((this.state.dateInsertOrder - new Date().getTime()));

        if (this.state.dateInsertOrder === '') {              // toast when no date selected
            errornotify()

            return
        } else {

            if (this.state.eventType === '') {                            // toast when no event selected
                this.setState({
                    errorChoosetype: true
                })
                missingEventTypeNotify()
                return
            } else {

                if (this.state.period !== 0) {                                     // when period is selected continue
                    const t = this.state.dateInsertOrder

                    let walid = this.state.rows
                    walid.push(this.createData(new Date().toLocaleString(), t.toString(), `${this.state.period} sec `));


                    this.setState({
                        rows: walid
                    })

                }

                this.setState({
                    errorChoosetype: false
                })
                succesnotify()
                setTimeout(() => this.insertEvent(this.state.index, this.state.timeStamp, this.state.eventType, this.state.dataofevent), secondBetweenTwoDate)
            }
        }
    }


    //Show StreamInfo
    showStreamInfo = async (id) => {
        const response = await axios(`http://localhost:8000/stream_info/${id}`);
        const data = await response.data;
        alert(data)
    }

    //insert Event
    insertEvent = async (index, timeStamp, eventType, dataofevent) => {

        if (this.state.addMultipleEvents === false) {                // check if array insert is turned off
            if (this.state.eventType !== "") {                          //check if event type not empty
                this.setState({
                    errorChoosetype: false
                })


                try {                                                             // trying to insert order
                    let eventDetails = `
   {"t1":${timeStamp},"payload":{"${eventType}":${dataofevent}}}`
                    const response = await axios.post(`http://localhost:8000/insert_ordered/${index}`, eventDetails);

                    const data = await response.data;
                    console.log("ddddddddddddddddddddddd ", data);
                    this.setState({

                        addMultipleEvents: false,
                        EventArray: ""

                    })
                    successInserOrderNotify();                                 // when successfully entered toast


                } catch (e) {
                    //console.log(e)
                    console.error(e)
                    alert("Please the Data correctly")                          // when error alert the user
                }
            } else {
                this.setState({
                    errorChoosetype: true
                })
                missingEventTypeNotify()
            }
        } else {


            alert(this.state.EventArray)


        }
    }

    // reading the Event entered by the user

    changedataofevent = event => {

        this.setState({
            dataofevent: event.target.value,
        }, () => {
            console.log('dataofevent', this.state.dataofevent)

        }
        )
    }


    // reading the Raw entered by the user

    changeraw = event => {

        if (event.target.value !== "") {
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

    // reading the Const entered by the user
    changeconst = event => {

        if (event.target.value !== "") {
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

    // reading the Var entered by the user

    changevar = event => {

        if (event.target.value !== "") {
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

    // reading if user choose exclusive or inclusive by query time traveler

    chooseexclusiveorinclusive = event => {


        this.setState({
            exclusiveorinclusive: event.target.value,
        }, () => {
            //   alert(this.state.exclusiveorinclusive)
        }
        )


    }

    // excuting query time traveler
    show_QueryTime = async (id, exklusivOrInklusiv, start, end) => {

        const url = `http://localhost:8000/query_time_travel/${id}`

        function getInklusivOrExklusiv(exklusivOrInklusiv) {                    // exculisve ot inclusive
            return (exklusivOrInklusiv ? "Inclusive" : "Exclusive");
        }

        const jsonBody = `{${(exklusivOrInklusiv ? `"Inclusive"` : `"Exclusive"`)} : {"start" : ${start} , "end": ${end}}}`
        //toDo  change URL with the one from Localhost (From the Rust-Project)
        try {
            const response = await axios.post(url, jsonBody);             // trying to excute
            const data = await response.data;



            this.setState({
                querytimeResult: JSON.stringify(data)                   // when successfull show results
            })


            console.log(data)
        } catch (err) {
            console.error(`Error is -->  ${err}`)                      // show error
            alert(jsonBody + "Error")


        }
    }






    render() {

        const Listofallstream = this.state.arrayofarrayss
        console.log(Listofallstream)
        const sindlistofallstreamsleer = this.state.istherestreamcreated;

        //   let UserID = parseInt(Cookies.get('UserID'));



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
                    <div className="Tablediv" >



                        <div className="TableID"  ><h2>ID</h2></div>

                        <div className="TableStatus" ><h2>Status</h2></div>

                        <div className="TableMinkey" ><h2>Min key</h2></div>

                        <div className="TableMaxKey"><h2>Max key</h2></div>

                        <div className="TableTreeHeight"><h2>Tree Height</h2></div>





                    </div>





                    {sindlistofallstreamsleer ?


                        <div>
                            {

                                Listofallstream.map((items, index) => {
                                    return (
                                        <ul id="myUL">

                                            <li key={items.id}>
                                                <div className='iddiv'>{items[0]}</div>
                                                <div className='statusdiv' >{items[1]}</div>
                                                <div className='minkeydiv'>{items[2]}</div>
                                                <div className='maxkeydiv'>{items[3]}</div>
                                                <div className='treeheightdiv'>{items[4]}</div>
                                                <div className='buttonsdiv' >
                                                    <button className='close' onClick={() => shutDown(items[0])} > Shutdown</button>
                                                    <button className='close1' onClick={() => recover(items[0])} > recover</button>
                                                    <button className='close2' onClick={() => this.ShowSysteminfo(items[0])} > show Stream Info</button>


                                                    <Dropdown className="d-inline mx-2" >
                                                        <Dropdown.Toggle variant="success" className='dropdownbutton' id="dropdown-autoclose-true">
                                                            More
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu title="Dropdown button" id="dropdown-basic-button" as={ButtonGroup} variant="dark" className="dropdown-content">

                                                            <Dropdown.Item variant="outlined" onClick={() => this.OpenIsertOrderDialog(items[0])} href="">Insert Ordered / Array </Dropdown.Item>
                                                            <Dropdown.Item onClick={() => this.OpenQueryTimeTravelDialog(items[0])} href="">Query Time Travel</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => ShowRightFlank(items[0])} href="">Show Right Flank</Dropdown.Item>

                                                        </Dropdown.Menu>

                                                    </Dropdown>




                                                    <Dialog open={this.state.InsertOrderDialog} onClose={this.closeInsertOrderDialog} maxWidth='md' fullWidth='md' fullScreen  >
                                                        <DialogTitle>Insert Event</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText>
                                                                <h1> Stream: {this.state.index} </h1>
                                                                <h3>Withouot Inserting a date there will be no Job added:
                                                                    <div className='insertorderschedule'>
                                                                        <LocalizationProvider dateAdapter={AdapterDateFns}  >
                                                                            <DateTimePicker
                                                                                renderInput={(props) => <TextField {...props} />}
                                                                                label="DateTimePicker"
                                                                                value={this.state.dateInsertOrder}
                                                                                onChange={this.UpdateDateInsertOrder}



                                                                            />
                                                                        </LocalizationProvider>
                                                                        <TextField
                                                                            className='period'
                                                                            id="outlined-select-currency-native"
                                                                            select
                                                                            label="Repeat Every: "
                                                                            sx={{ m: 1, width: '40ch' }}
                                                                            onChange={this.changeperiod}

                                                                            SelectProps={{
                                                                                native: true,
                                                                            }}

                                                                        >
                                                                            {Jobsperiod.map((option) => (
                                                                                <option value={option.label}>{option.value}</option>
                                                                            ))}
                                                                        </TextField>

                                                                    </div>
                                                                </h3>
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
                                                                <Select native defaultValue=""
                                                                    error={this.state.errorChoosetype}
                                                                    helperText={this.state.errorChoosetype ? "Please enter your name" : ""}
                                                                    id="grouped-native-select" label="Grouping" onChange={this.changeraw} value={this.state.rawtype} >
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
                                                                <Select native
                                                                    error={this.state.errorChoosetype}
                                                                    defaultValue="" id="grouped-native-select" label="Grouping" onChange={this.changeconst} value={this.state.consttype} >
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
                                                                <Select native defaultValue=""
                                                                    error={this.state.errorChoosetype} id="grouped-native-select" label="Grouping" onChange={this.changevar} value={this.state.vartype} >
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

                                                            {this.state.addMultipleEvents ?
                                                                <Button variant="outlined" size="large" className="ArrayOfEvents1" onClick={this.HideTextAndButton}>
                                                                    Add Single Events
                                                                </Button>
                                                                :
                                                                <Button variant="outlined" size="large" className="ArrayOfEvents" onClick={this.ShowHidenTextAndButton}>
                                                                    Add Array of Events
                                                                </Button>
                                                            }







                                                            {this.state.addMultipleEvents ?

                                                                <TextField
                                                                    id="outlined-read-only-input"
                                                                    label="Added Events"
                                                                    multiline
                                                                    maxRows={6}
                                                                    sx={{ m: 1, width: '160ch' }}


                                                                    variant="filled"
                                                                    helperText="Here will be the added Events be shown"
                                                                    value={this.state.EventArray}
                                                                />

                                                                : <div></div>}


                                                            {this.state.addMultipleEvents ?
                                                                <Button variant="outlined" size="large" className="addtoArray" onClick={() => this.InsertToArray(this.state.index, this.state.timeStamp, this.state.eventType, this.state.dataofevent)} >
                                                                    Add To Array
                                                                </Button>


                                                                : <div></div>}



                                                            <TableContainer component={Paper}>
                                                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <StyledTableCell>Date of Creation</StyledTableCell>
                                                                            <StyledTableCell align="right">Starts at</StyledTableCell>
                                                                            <StyledTableCell align="right">Period</StyledTableCell>

                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>

                                                                        {this.state.rows.map((row) => (
                                                                            <StyledTableRow key={row.name}>
                                                                                <StyledTableCell component="th" scope="row">
                                                                                    {row.name}
                                                                                </StyledTableCell>
                                                                                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                                                                <StyledTableCell align="right">{row.fat}</StyledTableCell>



                                                                            </StyledTableRow>
                                                                        ))}

                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>

                                                        </DialogContent>



                                                        <DialogActions>

                                                            <Button className='insertbutton' onClick={() => this.insertEvent(this.state.index, this.state.timeStamp, this.state.eventType, this.state.dataofevent)}>Insert Now</Button>
                                                            <Button className='insertbuttonschedule' onClick={() => this.setScheduleInsertOrder()}>Insert As Scheduled</Button>
                                                            <Button className='closeInsertOrderdialog' onClick={this.closeInsertOrderDialog}>Close</Button>




                                                        </DialogActions>
                                                    </Dialog>



                                                    <Dialog open={this.state.systeminfoopendialog} onClose={this.closeSysteminfoDialog} fullScreen maxWidth='md' fullWidth='md' >
                                                        <DialogTitle>Stream Info:</DialogTitle>
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
                                                                {ExluciveOrInclusiveOptions.map((option) => (
                                                                    <option key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </option>
                                                                ))}

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

                                                                label="Array[Event]"
                                                                multiline
                                                                maxRows={6}
                                                                sx={{ m: 1, width: '160ch' }}


                                                                variant="filled"
                                                                helperText="The result will be shown here"
                                                                value={this.state.querytimeResult}
                                                            />










                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button className='insertbutton' onClick={() => this.show_QueryTime(this.state.index, this.state.exclusiveorinclusive, this.state.queryTimeStart, this.state.queryTimeEnd)}> Show Query Time Travel</Button>
                                                            <Button className='closeInsertOrderdialog' onClick={this.closeQueryTimeTravelDialog}>Close</Button>

                                                        </DialogActions>
                                                    </Dialog>





                                                    <Dialog open={this.state.rightflankopendialog} onClose={this.closeRightFlankDialog} maxWidth='md' fullWidth='md' >
                                                        <DialogTitle>Right Flank:</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText>

                                                                <TextField
                                                                    id="outlined-read-only-input"
                                                                    label="Array[Event]"
                                                                    multiline
                                                                    maxRows={6}
                                                                    sx={{ m: 1, width: '90ch' }}


                                                                    variant="filled"
                                                                    helperText="The result will be shown here"
                                                                    value={this.state.rightFlankText}
                                                                />
                                                            </DialogContentText>


                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={this.closeRightFlankDialog}>Close</Button>

                                                        </DialogActions>
                                                    </Dialog>

                                                    <ToastContainer />

                                                </div>
                                            </li>
                                        </ul>

                                    );
                                })
                            }
                        </div>



                        : <div className='inCaseNoStreams'>

                            <h1 className='noStreams'></h1>


                        </div>

                    }




                </div>
                {/* <button onClick={signUp("waliddd.net", "12333", "waliii", "011215458454")}>SignUp</button> */}
                {/* <button onClick={signIn("waliddd.net", "12333")}>SignIn</button>   */}




                {/*  <button onClick={this.fetchUserEmail()}>Fetch Email</button>*/}
            </div >
        )
    }


}

