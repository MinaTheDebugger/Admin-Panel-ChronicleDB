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


async function shutDown(id) {
    await fetch(`http://localhost:8000/shutdown_stream/${id}`);

    //  alert("its now shutDown succesfulyys");

}

async function recover(id) {
    await fetch(`http://localhost:8000/recover_stream_snapshot/${id}`);
    //  alert("stream recovered successfully");
}







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


const succesnotify = () => {
    toast.success('Order Added Succefully', {
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








/*
insertOrderedEventArr = async (id, arr) => {
    try {
        let eventDetails = arr
        const response = await axios.post(`http://localhost:8000/insert_ordered_array/${id}`, eventDetails);

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
*/

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
            rightflankopendialog: false,
            systeminfo: '',
            eventType: "",
            dataofevent: '0',
            rawtype: "",
            consttype: "",
            vartype: "",
            queryTimeStart: 0,
            queryTimeEnd: 0,
            exclusiveorinclusive: true,
            querytimeResult: '',
            arrayofarrayss: [],
            rightFlankText: '',
            arrayOFIdCurrenUser: [],
            addMultipleEvents: false,
            EventArray: [],
            errorChoosetype: false,
            dateInsertOrder: ''

        }
    }




    getArrayOFStreamsIdOFTHeCurrentUser = async (id) => {
        try {
            const url = await `http://localhost:5000/user/streamperuser?user_id=${id}`
            const response = await axios(url);
            const data = await response.data;

            this.setState({
                arrayOFIdCurrenUser: data
            }, () => {
                //  alert(this.state.arrayOFIdCurrenUser)
            }
            )
        } catch (err) {
            alert(err)
            console.error(`Error is -->  ${err}`)
        }
    }





    getStreamIDsFromList = async (list) => {
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



    filterStreamsForUser = () => {
        //    alert(this.state.id)
        //   Cookies.get('isAdmin') === false
        if (Cookies.get('isAdmin') === 'false') {
            let array2 = []

            this.state.id.forEach((element) => {
                // alert(element)
                //  alert(element[0] + "first")
                // let index = this.state.id.indexOf(element);


                if (this.state.arrayOFIdCurrenUser.includes(element[0])) {

                    array2.push(element)
                    //   alert(array2)


                }
            })

            this.state.id = array2

            //    alert(this.state.id)

        }

    }













    fetchData = async () => {
        const fetch1 = await fetch('http://localhost:8000/show_streams')
        const response1 = await fetch1.json()
        this.setState({ id: response1 });
    }


    UpdateDateInsertOrder = (newValue) => {
        this.setState({
            dateInsertOrder: newValue
        }, () => {

        })

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



    async componentDidMount() {
        setInterval(() => {
            this.fetchData()
            this.getArrayOFStreamsIdOFTHeCurrentUser(Cookies.get('UserID'))
            this.filterStreamsForUser()
            this.updatestreamcreated()
            this.getStreamIDsFromList(this.state.id)
            //   this.getArrayofKeyfromID(this.state.arrayofIDs)
        }, 1000);
    }







    /*
           getStreamIDsFromList = async (list) => {
               let arrayofarrays = [];
               let arrayofKeys = [];
               list.forEach(element => arrayofarrays.push(element[0]))
       
       
       
               this.setState({
                   arrayofIDs: arrayofarrays
               }, () => {
                   // alert(this.state.arrayofIDs)
                   // console.log(typeof (this.state.arrayofIDs) + "ssssssssssssssssssssssssssssssss")
               }
               )
           }
       
       */




    getStreamIDsFromList = async (list) => {
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
        //   alert(arrayofarrays)

        /*
                this.setState({
                    arrayofarrayss: list
                }, () => {
                    // alert(this.state.arrayofIDs)
                    // console.log(typeof (this.state.arrayofIDs) + "ssssssssssssssssssssssssssssssss")
                }
                )
        */

    }









    getArrayofKeyfromID = async (list2) => {
        let arrayofarrayss = [];


        //   getMinkey4(0)

        list2.forEach(element => list2.push([getMinkey4(0), getMinkey4(0)])
        )

        this.setState({
            arrayofKeys: arrayofarrayss
        }, () => {
            //  alert(this.state.arrayofKey)

        }
        )
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




    openRightFlankDialog = async (id) => {
        const url = await `http://localhost:8000/show_right_flank/${id}`
        const response = await axios(url);
        const data = await response.data;
        this.setState({
            rightFlankText: data,
            rightflankopendialog: true
        })
    }


    OpenSysteminfoDialog = async (id) => {
        const response = await axios(`http://localhost:8000/stream_info/${id}`);
        const data1 = await response.data;
        //alert(data1)
        //let data2 = await JSON.parse(data1)
        this.setState({
            systeminfoopendialog: true,
            index: id,
            // systeminfo: JSON.stringify(data1).
            systeminfo: data1
        })
    }



    ShowSysteminfo = async (id) => {

        const response = await axios(`http://localhost:8000/stream_info/${id}`);
        const data1 = await response.data;

        alert(data1)


    }







    closeInsertOrderDialog = () => {
        this.setState({
            InsertOrderDialog: false,
            addMultipleEvents: false,
            EventArray: ""
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



    closeRightFlankDialog = () => {

        this.setState({
            rightflankopendialog: false
        })
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


    ShowHidenTextAndButton = () => {

        this.setState({
            addMultipleEvents: true
        })
    }

    HideTextAndButton = () => {
        this.setState({
            addMultipleEvents: false
        })
    }


    InsertToArray = (id, timeStamp, eventType, dataofevent) => {
        this.state.EventArray.push(`
{"t1":${timeStamp},"payload":{"${eventType}":${dataofevent}}}`)
        /*
        this.setState({
            EventArray: [`
                {"t1":${timeStamp},"payload":{"${eventType}":${dataofevent}}}`]
        })
*/

    }

    setScheduleInsertOrder = () => {
        var secondBetweenTwoDate = Math.abs((this.state.dateInsertOrder - new Date().getTime()));

        succesnotify()


        setTimeout(() => this.insertEvent(this.state.index, this.state.timeStamp, this.state.eventType, this.state.dataofevent), secondBetweenTwoDate)
    }







    showStreamInfo = async (id) => {
        const response = await axios(`http://localhost:8000/stream_info/${id}`);
        const data = await response.data;
        alert(data)
    }














    insertEvent = async (index, timeStamp, eventType, dataofevent) => {

        if (this.state.addMultipleEvents === false) {
            if (this.state.eventType !== "") {


                try {
                    let eventDetails = `
   {"t1":${timeStamp},"payload":{"${eventType}":${dataofevent}}}`
                    const response = await axios.post(`http://localhost:8000/insert_ordered/${index}`, eventDetails);

                    const data = await response.data;
                    console.log("ddddddddddddddddddddddd ", data);
                    this.setState({
                        InsertOrderDialog: false,
                        addMultipleEvents: false,
                        EventArray: ""

                    })

                } catch (e) {
                    //console.log(e)
                    console.error(e)
                    alert("Please the Data correctly")
                }
            } else {
                this.setState({
                    errorChoosetype: true
                })

            }
        } else {


            alert(this.state.EventArray)


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


    chooseexclusiveorinclusive = event => {


        this.setState({
            exclusiveorinclusive: event.target.value,
        }, () => {
            //   alert(this.state.exclusiveorinclusive)
        }
        )


    }


    show_QueryTime = async (id, exklusivOrInklusiv, start, end) => {



        //console.log("its working");
        const url = `http://localhost:8000/query_time_travel/${id}`
        // exklusivOrInklusiv is boolean , falls es true ist dann ist es inklusiv // 
        // if exklusivOrInklusiv false ist , ist es exklusiv
        function getInklusivOrExklusiv(exklusivOrInklusiv) {
            return (exklusivOrInklusiv ? "Inclusive" : "Exclusive");
        }

        const jsonBody = `{${(exklusivOrInklusiv ? `"Inclusive"` : `"Exclusive"`)} : {"start" : ${start} , "end": ${end}}}`
        //toDo  change URL with the one from Localhost (From the Rust-Project)
        try {
            const response = await axios.post(url, jsonBody);
            const data = await response.data;

            //   let firstKey = Object.keys(data[0].payload)[0];
            //   alert(firstKey)
            //alert(response.data);
            //  alert(JSON.stringify(data));

            this.setState({
                querytimeResult: JSON.stringify(data)
            })

            //  alert(JSON.stringify(data[0].payload.U16));
            //alert("Time Stamp is " + JSON.stringify(data[0].t1) + " type is" + JSON.stringify(data[0].payload))
            console.log(data)
        } catch (err) {
            console.error(`Error is -->  ${err}`)
            alert(jsonBody + "Error")


        }
    }




    getMinkey = async (id) => {

        try {
            const url = `http://localhost:8000/min_key/${id}`
            const response = await axios(url);
            const data = await response.data;
            //   alert(data)
            return (data)
        } catch (err) {
            console.error(`Error is -->  ${err}`)

        }
    }




    ShowRightFlank = async (id) => {

        try {
            const url = await `http://localhost:8000/show_right_flank/${id}`
            const response = await axios(url);
            const data = await response.data;
            //  alert(data)

            return (data)

        } catch (err) {
            console.error(`Error is -->  ${err}`)


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

                                                            <Dropdown.Item variant="outlined" onClick={() => this.OpenIsertOrderDialog(items[0])} href="">Insert Ordered </Dropdown.Item>
                                                            <Dropdown.Item onClick={() => this.OpenQueryTimeTravelDialog(items[0])} href="">Query Time Travel</Dropdown.Item>
                                                            <Dropdown.Item onClick={() => ShowRightFlank(items[0])} href="">Show Right Flank</Dropdown.Item>

                                                        </Dropdown.Menu>

                                                    </Dropdown>




                                                    <Dialog open={this.state.InsertOrderDialog} onClose={this.closeInsertOrderDialog} maxWidth='md' fullWidth='md' fullScreen  >
                                                        <DialogTitle>Insert Event</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText>
                                                                <h1> Stream: {this.state.index} </h1>
                                                                <h3>Option to Schedule the Insert Order:
                                                                    <div className='insertorderschedule'>
                                                                        <LocalizationProvider dateAdapter={AdapterDateFns}  >
                                                                            <DateTimePicker
                                                                                renderInput={(props) => <TextField {...props} />}
                                                                                label="DateTimePicker"
                                                                                value={this.state.dateInsertOrder}
                                                                                onChange={this.UpdateDateInsertOrder}



                                                                            />
                                                                        </LocalizationProvider>

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
                                                                id="outlined-read-only-input"
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

