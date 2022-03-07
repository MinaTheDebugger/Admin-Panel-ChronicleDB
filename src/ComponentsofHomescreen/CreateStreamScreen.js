import React, { Component } from 'react'
import axios from "axios";
import { FormControlLabel } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { TextField, } from '@mui/material';

import Cookies from 'js-cookie';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DateTimePicker } from '@mui/lab';
import '../components/createStreamScreen.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useHistory } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));





const Jobsperiod = [
    {
        label: 0,
        value: "NO ",
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


const optionsofmultiplediskqueue = [
    {
        label: 10,
        value: 10,
    },
    {
        label: 1,
        value: 1,
    },
    {
        label: 2,
        value: 2,
    },
    {
        label: 3,
        value: 3,
    },
    {
        label: 4,
        value: 4,
    },
    {
        label: 5,
        value: 5,
    },
    {
        label: 6,
        value: 6,
    },
    {
        label: 7,
        value: 7,
    },
    {
        label: 8,
        value: 8,
    },
    {
        label: 9,
        value: 9,
    }
]


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




const optionsoflightweightindex = [
    {
        label: "Empty",
        value: "Empty"
    },

    {
        label: "SMA",
        value: "SMA"
    },
    {
        label: "Bloomfilter",
        value: "Bloomfilter"
    }


]

const compressoroptions = [
    {
        label: "none",
        value: "none",
    },
    {
        label: "LZ4_Fast_No_Meta",
        value: "LZ4_Fast_No_Meta",
    },
    {
        label: "LZ4_Fast_With_Meta",
        value: "LZ4_Fast_With_Meta",
    },
    {
        label: "Sprintz",
        value: "Sprintz",
    }
]

const riverthreads = [
    {
        label: "t",
        value: "t",
    },
    {
        label: "c",
        value: "c",
    },
    {
        label: "d",
        value: "d",
    },
    {
        label: "0",
        value: "0",
    }
]

const routeChange = () => {

    let path = '/CreateStream';
    history.push(path);
}


async function CreateStreamPgAdmin(stream_id, user_id) {

    try {
        const createStreamDetails = {
            stream_id: stream_id,
            user_id: user_id,
        };
        const response = await axios.post('http://localhost:5000/user/createstream', createStreamDetails)
        console.log(response.data)



    } catch (err) {
        console.error(err + "sssssssssssssssssssssssss")
    }

}




const successCreatedStreamNotify = () => {
    toast.success('Successfully Stream created', {
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





function goToHomePage() {

    history.push("/Home");
    window.location.reload();


}

function convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
}





class CreateStreamScreen extends Component {

    constructor(props) {
        super(props)


        this.state = {
            checklog: false,
            checkdebug: false,
            datafilesinput: '',
            translationfilesinput: '',
            bootfileinput: '',
            mulltiplediskmaxqueue: 10,
            datatypeofstreameventlayout: 'empty',
            lightweightindex: '',
            logicalblocksizeinput: 32768,
            macroblocksizeinput: 327680,
            macroblockspareinput: 32768,
            macroblockpreallocationinput: 300,
            macroblockbatchallocationinput: 300,
            macroblockscache: 2500,
            nodescache: 10000,
            compressor: 'empty',
            riverthreads: 'empty',
            maxdeltaqueue: 10,
            openschedule: false,
            dateCreateStream: "",
            rawtype: "",
            consttype: "",
            vartype: "",
            eventType: "",
            dataofevent: '0',
            errorChoosetype: false,
            period: 30,
            TableRows: [],
            rows: [

            ]

        }

    }
    changelog = event => {

        this.setState(prevState => ({
            checklog: !prevState.checklog
        }), console.log('Log is checked :', this.state.checklog))


    }



    createData = (dateofcreation, startsat, period) => {
        // let answer = this.state.TableRows
        // answer.push([dateofcreation, startsat, period])
        return { dateofcreation, startsat, period };
        /*
        this.setState({
            TableRows: answer
        }, () => {
            alert(this.state.TableRows)
        })
        */
    }

    /*
    , () => {
        console.log('Log is checked :', this.state.checklog)

    })
}

*/


    changeperiod = event => {
        this.setState({
            period: event.target.value
        }, () => {
            //  alert(this.state.period)
        })
    }
    changedebug = event => {
        /*   this.setState({
               checkdebug: 'true'
           }, () => {
               console.log('Debug is checked :', this.state.checkdebug)
   
           })
   */

        this.setState(prevState => ({
            checkdebug: !this.state.checkdebug
        }), console.log('checkdebug is checked :', this.state.checkdebug))
    }


    changemultiplediskmaxqueue = event => {
        this.setState({
            multiplediskmaxqueue: event.target.value

        }, () => {
            console.log('Multiple disk max queue:', this.state.multiplediskmaxqueue)
        }
        )
    }

    OpenScheduleDialog = () => {
        this.setState({
            openschedule: true
        })
    }

    CloseScheduleDialog = () => {
        this.setState({
            openschedule: false
        })

    }


    changedatafiles = event => {
        this.setState({
            datafilesinput: event.target.value
        }, () => {
            console.log('DataFiles: ', this.state.datafilesinput)

        })
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


    changedataofevent = event => {

        this.setState({
            dataofevent: event.target.value,
        }, () => {
            console.log('dataofevent', this.state.dataofevent)

        }
        )
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
    changetranslationfiles = event => {
        this.setState({
            translationfilesinput: event.target.value
        }, () => {
            console.log('Translationfiles:', this.state.translationfilesinput)

        })
    }
    changebootfileinput = event => {
        this.setState({
            bootfileinput: event.target.value
        }, () => {
            console.log('Boot file:', this.state.bootfileinput)

        })
    }

    StreamEventLayoutChange = event => {
        this.setState({
            datatypeofstreameventlayout: event.target.value

        }, () => {
            console.log('Stream Event Layout:', this.state.datatypeofstreameventlayout)
        }
        )

    }

    changelightweightindex = event => {
        this.setState({
            lightweightindex: event.target.value

        }, () => {
            console.log('Lightweight Index:', this.state.lightweightindex)
        }
        )

    }

    changelogicalblocksize = event => {
        this.setState({
            logicalblocksizeinput: event.target.value
        }, () => {
            console.log('Logical block size :', this.state.logicalblocksizeinput)

        })
    }
    changemacroblocksize = event => {
        this.setState({
            macroblocksizeinput: event.target.value
        }, () => {
            console.log('MacroBlock size :', this.state.macroblocksizeinput)

        })
    }
    changemacroblockspare = event => {
        this.setState({
            macroblockspareinput: event.target.value
        }, () => {
            console.log('MacroBlock spare :', this.state.macroblockspareinput)

        })
    }
    changemacroblockpreallocation = event => {
        this.setState({
            macroblockpreallocationinput: event.target.value
        }, () => {
            console.log('MacroBlock preallocation :', this.state.macroblockpreallocationinput)

        })
    }




    UpdateDate = (newValue) => {
        this.setState({
            dateCreateStream: newValue
        },
            () => {
                //   alert(this.state.dateCreateStream)
            })
    }



    changemacroblockbatchallocation = event => {
        this.setState({
            macroblockbatchallocationinput: event.target.value
        }, () => {
            console.log('MacroBlock batch allocation:', this.state.macroblockbatchallocationinput)

        })
    }

    changemacroblockscache = event => {
        this.setState({
            macroblockscache: event.target.value
        }, () => {
            console.log('Macro blocks cache :', this.state.macroblockscache)

        })
    }


    changenodescache = event => {
        this.setState({
            nodescache: event.target.value
        }, () => {
            console.log('Nodes Cache :', this.state.nodescache)

        })
    }

    changecompressor = event => {
        this.setState({
            compressor: event.target.value,
            passedmacroblockscache: this.props.passmacroblockcachetocompressoer


        }, () => {
            console.log('Compressor:', this.state.compressor)

        }
        )

    }


    createData = (name, calories, fat) => {
        return { name, calories, fat };
    }
    changeriverthreads = event => {
        this.setState({
            riverthreads: event.target.value

        }, () => {
            console.log('River Threads:', this.state.riverthreads)

        }
        )
    }

    changemaxdeltaqueue = event => {
        this.setState({
            maxdeltaqueue: event.target.value
        }, () => {
            console.log('Max delta queue :', this.state.maxdeltaqueue)

        })
    }

    setTimerCreateStream = () => {
        var secondBetweenTwoDate = Math.abs((this.state.dateCreateStream - new Date().getTime()));
        const t = this.state.dateCreateStream
        //alert(t.toString())
        if (this.state.period !== 0) {
            let walid = this.state.rows
            walid.push(this.createData(new Date().toLocaleString(), t.toString(), `${this.state.period} sec `));


            this.setState({
                rows: walid
            })

        }

        // alert(secondBetweenTwoDate)
        setTimeout(() => this.createStream(this.state.checklog, this.state.checkdebug, this.state.mulltiplediskmaxqueue, this.state.logicalblocksizeinput, this.state.macroblocksizeinput, this.state.macroblockpreallocationinput, this.state.macroblockbatchallocationinput, this.state.macroblockscache, this.state.nodescache, this.state.maxdeltaqueue), secondBetweenTwoDate);



    }



    createStream = (checklog, checkdebug, mulltiplediskmaxqueue, logicalblocksizeinput, macroblocksizeinput, macroblockpreallocationinput, macroblockbatchallocationinput, macroblockscache, nodescache, maxdeltaqueue, eventType, dataofevent) => {
        //  console.log("its working");
        const url = 'http://localhost:8000/create_stream'


        if (eventType === "") {
            this.setState({
                errorChoosetype: true
            }, () => {
                errorMissingFields();
                return;
            })

        } else {
            this.setState({
                errorChoosetype: false
            })
        }


        // console.log(this.state.passedmacroblockscache + "CreateStream method");
        const objectTest = `
        [Debug]#
          Log							= ${checklog}
        
          # All the dynamic TAB+Index optimized sizes are discarded and
          # the minimum size for the nodes is used instead, if set to true. 
          # These minimum sizes are:
          # 	- Index Data Size 			:= 3 Keys   / Node.
          # 	- Leaf Data Size  			:= 2 Events / Node.
          # Otherwise, calculates the most suitable TAB+Index sizes. and hi
          Debug							= ${checkdebug}
        
        [I/O]#	
          # Data files.
          # data = C:\dataFile1
          # data = I:\dataFile2
          # data = H:\dataFile3
          # ...
          Data 							= data1

          
          # Translation file.
          # This is used to serialize the rightFlank on a clean system shutdown.
          Translation						= translation
          
          # Boot file.
          # This is used to e.g. recover the system and contains information for loaders, such as NodeID counter and root NodeID.
          Boot							= .boot
          
          # Multiple Disk Queue Checkpoint.
          # The number of MacroBlocks allowed to be queued on disk writer thread(s).
          # This number must be much lower than MacroBlock Cache * number of data files.
          Multiple disk max queue 		= ${mulltiplediskmaxqueue}
          
        [Stream Event Layout]#
          # You must declare the layout in a valid json format.
          
          # Note: The layout must be valid, hence a dummy event layout is expected.
          # Note: For a variable type, the upper limit must be defined.
          
          # E.g. (Event) for a variable string length, the dummy layout must contain the max expected string length.
          
          # The following list declares possible types for an event layout:
          
          #	"Empty"
          #--------------------------------------------------------
          #	{"U8":0}
          #--------------------------------------------------------
          #	{"I8":0}
          #--------------------------------------------------------
          #	{"U16":0}
          #--------------------------------------------------------
          #	{"I16":0}
          #--------------------------------------------------------
          #	{"U32":0}
          #--------------------------------------------------------
          #	{"I32":0}
          #--------------------------------------------------------
          #	{"F32":0.0}
          #--------------------------------------------------------
          #	{"U64":0}
          #--------------------------------------------------------
          #	{"I64":0}
          #--------------------------------------------------------
          #	{"F64":0.0}
          #--------------------------------------------------------
          #	{"ConstString":"Hallo-Welt"}
          #--------------------------------------------------------
          #	{"VarString":"Hallo Welt"}
          #--------------------------------------------------------
          #	{"ConstU8List":[1,2,3,4,5]}
          #--------------------------------------------------------
          #	{"ConstI8List":[1,2,3,4,5]}
          #--------------------------------------------------------
          #	{"ConstU16List":[1,2,3,4,5]}
          #--------------------------------------------------------
          #	{"ConstI16List":[1,2,3,4,5]}
          #--------------------------------------------------------
          #	{"ConstU32List":[1,2,3,4,5]}
          #--------------------------------------------------------
          #	{"ConstI32List":[1,2,3,4,5]}
          #--------------------------------------------------------
          #	{"ConstF32List":[1.0,2.0,3.0,4.0,5.0]}
          #--------------------------------------------------------
          #	{"ConstU64List":[1,2,3,4,5]}
          #--------------------------------------------------------
          #	{"ConstI64List":[1,2,3,4,5]}
          #--------------------------------------------------------
          #	{"ConstF64List":[1.0,2.0,3.0,4.0,5.0]}
          #--------------------------------------------------------
          #	{"VarU8List":[1,2,3,4,5]}
          #--------------------------------------------------------
          #	{"VarI8List":[1,2,3,4,5]}
          #--------------------------------------------------------
          #	{"VarU16List":[1,2,3,4,5]}
          #--------------------------------------------------------
          #	{"VarI16List":[1,2,3,4,5]}
          #--------------------------------------------------------
          #	{"VarU32List":[1,2,3,4,5]}
          #--------------------------------------------------------
          #	{"VarI32List":[1,2,3,4,5]}
          #--------------------------------------------------------
          #	{"VarF32List":[1.0,2.0,3.0,4.0,5.0]}
          #--------------------------------------------------------
          #	{"VarU64List":[1,2,3,4,5]}
          #--------------------------------------------------------
          #	{"VarI64List":[1,2,3,4,5]}
          #--------------------------------------------------------
          #	{"VarF64List":[1.0,2.0,3.0,4.0,5.0]}
          #--------------------------------------------------------
          #	{"Compound":[{"U64":0},{"I64":0},{"F64":0.0},{"ConstString":"Hallo-Welt"}]}
          #--------------------------------------------------------
          #Event							= {"ConstU64List":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]}
          Event 							= {"${eventType}" : ${dataofevent}}
          
        [Lightweight Index]#
          # The lightweight index layout must follow similar JSON notes as for for event layout.
          # The following list declares possible types for value:
          
          # Internal:
            # Empty
          # JSON:
            # "Empty"
            
          # Internal:
            # SMA { cnt: 0, sum: 0f64, min: 0f64, max: 0f64 }
          # JSON:
            # {"SMA":{"cnt":0,"sum":0.0,"min":0.0,"max":0.0}}
            
          # Internal:
            # BloomFilter(BloomFilter::new(8, 32))
          # JSON:
            # {"BloomFilter":{"bit_set":{"bit_array":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"hash_functions":[{"a":24309,"b":42942},{"a":16260,"b":39300},{"a":14853,"b":45314},{"a":42661,"b":55560},{"a":9686,"b":36492},{"a":785,"b":4537},{"a":13599,"b":16258},{"a":8815,"b":7937}]}}
        
          # The following list declares possible types for  value:
          # "Mono"							:= efficient attribute unwrap of events of a single attribute in total.
          # "Empty"							:= no mapping to an attribute.
          # {"Slice":[n1,n2,n3,..]}			:= sequence of projections, ideal for complex attributes e.g. for Compound(..) or mapping on a char of a String.
          # The "Mono" value is equivalent to {"Slice":[0]}.
          # The "Empty" value is equivalent to {"Slice":[]}.
          
          # Note: SMA/Bloomfilter require a projection on a float value.
          # You can add unlimited  by defining new ones in new lines, similar to thekey earlier.
          # The index layouts:
          Lightweight index				= {"aggregate":{"SMA":{"cnt":0,"sum":0.0,"min":0.0,"max":0.0}},"projector_sequence":"Mono"}
          #Lightweight index				= {"aggregate":{"SMA":{"cnt":0,"sum":0.0,"min":0.0,"max":0.0}},"projector_sequence":"Empty"}
          
        [Block]#
          # Number of bytes for an uncompressed serialized node.
          # Generally, this should match the I/O block size of the data files.
          # Can be an arbitrary numeric value like-wise.
          # l								:= Logical IO Block Size.
          # p								:= Physical IO Block Size.
          # <number> 						:= <number> of bytes.
          # WARNING: l and p not supported yet!
          LogicalBlock size 				= ${logicalblocksizeinput}
          
          # Number of bytes for a MacroBlock.
          # Denoted in a multiply of Logical Block Size.
          # The multiply value must be a decimal number and never 0.
          MacroBlock size 				= ${macroblocksizeinput}
          
          # Percent of spare space in a MacroBlock.
          MacroBlock spare				= 0.1
          
          # Number of MacroBlocks to preallocate at start.
          MacroBlock preallocation 		= ${macroblockpreallocationinput}
          
          # Allocates a number of MacroBlocks, when MacroBlockPreallocation
          # is exhausted.
          # 0								:= Batch allocator disabled.
          # n, where n is greater or equal to MacroBlockPreallocation.
          MacroBlock batch allocation		= ${macroblockbatchallocationinput}
          
        [Cache]#
          # Number of MacroBlocks to keep in memory in LRU i.e. cache.
          MacroBlocks cache				= ${macroblockscache}
          
          # Number of Nodes to keep in memory in LRU i.e. cache.
          Nodes cache						= ${nodescache}
          
        [Compressor]#
          # The compression algorithm used.
          # List of compressors is		:= [none, LZ4_Fast_No_Meta, LZ4_Fast_With_Meta, Sprintz].
          # none							:= Compression disabled.
          
          # LZ4_fast_no_meta				:= Official LZ4 library is used with options: Fast and no Meta size information.
          # This version is ideal when using fixed sized l-blocks, which can not overflow.
          # Additionally, a c-block may never exceed the l-block size by any means, hence it uses a fixed allocation for 
          # a decompression buffer and may never overflow consequently.
          
          # LZ4_Fast_With_Meta			:= Official LZ4 library is used with options: Fast and includes Meta size information.
          # Note: This version will guarantee at any sizes, that the compressor/decompressor allocates sufficient space,
          # even if provided with less allocation. This ensures dynamic l-blocks of any sizes and allows different l-block sizes across
          # the "cold" vs. "warm" regions.
          # This guarantee comes with a small penalty, hence should only be used with caution.
          # Later it is planned to switch dynamically between compressors, to ensure cold regions benefit from wider l-blocks
          # and the warm regions stay fast with aligned l-blocks.
          # The system does not support switching between compressors dynamically, yet.
          Compressor						= LZ4_Fast_No_Meta
          
          # For lz4 the extra parameter is the compression level.
          # Use of the the wrapped variants:
            # {"I32":<Signed Integer>}
            # {"I32":"None"}
            # {"Sprintz":[true,16,true,true]}
            # Where: (bits, dims, delta, write_size) = (is_8bits, data_dims, is_delta, write_size)
        
          # Note: LZ4 variants expect an extra of i32.
          # Note: Sprintz expects an extra of (is_8bits, data_dims, is_delta, write_size).
          Compressor extras				= {"I32":12}
          
          # Number of river threads in the delta.
          # 0								:= Pipeline bypassed.
          # t 							:= Number of CPU threads.
          # c 							:= Number of CPU cores.
          # d 							:= Default number threads.
          # <number> 						:= <number> of threads.
          # [t|c] - <number>				:= [t|c] - <number> of threads.
          River threads 					= d
        
          # Number of jobs to queue in the delta before blocking.
          # Larger queues may enhance performance, but require longer syncing, when shutdown. 
          # This value * number of disks must be always smaller than MacroBlocksCache.
          Max delta queue					= ${maxdeltaqueue}
          
          
          
          
        ########################### End ChronicleDB Configuration File ###########################	
        ##########################################################################################
        ##########################################################################################
        ##########################################################################################
        ##########################################################################################
        `

        axios.post(url, objectTest)
            .then(function (response) {


                //console.log(response);
                //     alert(response.data[31])

                CreateStreamPgAdmin(response.data[31], Cookies.get('UserID'))
                successCreatedStreamNotify();
                goToHomePage();
            })
            .catch(function (error) {
                console.log(error.message);

                //alert(error.message)
            })
        return


    }

    render() {

        const rows = this.state.TableRows

        return (
            <div>

                {/*///////////////////////////////////////////////////////Debug Box/////////////////////////////////////////////////////////////*/}
                <div className='Debugboxex'>

                    <h1> Debug: </h1>
                    <div>
                        <FormControlLabel checked={this.state.checklog} onChange={this.changelog} control={<Switch />} label="Log" className='chechlog' />
                        <FormControlLabel checked={this.state.checkdebug} onChange={this.changedebug} control={<Switch />} label="Debug" className='chechdebug' />
                        <FormGroup>

                        </FormGroup>
                    </div>
                    <div>

                    </div>


                    <hr class="rounded"></hr>

                </div>
                {/*//////////////////////////////////////////////////End of Debug Box/////////////////////////////////////////////////////////////*/}
                {/*//////////////////////////////////////// <        IO             >/////////////////////////////////////////////////////////////*/}
                <div className='IO'>
                    <h1> I/O </h1>
                    <form>
                        <div className='iodiv'>



                            <TextField
                                onChange={this.changedatafiles}
                                required
                                id="outlined-required"
                                label="Datafiles"
                                defaultValue="\data"
                                fullWidth

                                sx={{ m: 1, width: '70ch' }}

                            />
                            <TextField

                                onChange={this.changetranslationfiles}
                                required
                                id="outlined-required"
                                label="Translation"
                                defaultValue="transaltion"

                                sx={{ m: 1, width: '70ch' }}

                            />
                            <TextField
                                onChange={this.changebootfileinput}
                                required
                                id="outlined-required"
                                label="Boot File"
                                defaultValue=".boot"

                                sx={{ m: 1, width: '70ch' }}

                            />

                            <TextField
                                id="outlined-select-currency-native"
                                select
                                label="Multiple disk max queue:"
                                sx={{ m: 1, width: '70ch' }}
                                onChange={this.changemultiplediskmaxqueue}

                                SelectProps={{
                                    native: true,
                                }}

                            >
                                {optionsofmultiplediskqueue.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>

                        </div>

                    </form>

                    <hr class="rounded"></hr>
                </div>

                {/*//////////////////////////////////////// <       End IO             >/////////////////////////////////////////////////////////////*/}
                {/*//////////////////////////////////////// < Stream Event Layout      >/////////////////////////////////////////////////////////////*/}
                <div className='streamEventlayout' >
                    <h1>Stream Event Layout</h1>

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



                    <hr class="rounded"></hr>



                </div>
                {/*//////////////////////////////////////// < End Stream Event Layout      >/////////////////////////////////////////////////////////////*/}
                {/*//////////////////////////////////////// < LightweightIndex     >/////////////////////////////////////////////////////////////////////*/}
                <div className='lightweightindex'>
                    <h1>Lightweight Index</h1>



                    <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Data Type:"
                        sx={{ m: 1, width: '70ch' }}
                        onChange={this.changelightweightindex}

                        SelectProps={{
                            native: true,
                        }}

                    >
                        {optionsoflightweightindex.map((option) => (
                            <option value={option.label}>{option.value}</option>
                        ))}
                    </TextField>






                    <hr class="rounded"></hr>
                </div>
                {/*//////////////////////////////////////// < LightweightIndex     >/////////////////////////////////////////////////////////////////////*/}
                {/*//////////////////////////////////////// < BLock    >/////////////////////////////////////////////////////////////////////////////////*/}
                <div>
                    <h1>Block</h1>
                    <form>
                        <div className='Macroblocksizediv'>

                            <TextField
                                onChange={this.changelogicalblocksize}
                                required
                                id="outlined-required"
                                label="Logical block size :"
                                defaultValue="32768"
                                sx={{ m: 1, width: '70ch' }}
                                type="number"
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                inputmode="numeric"
                                pattern="[0-9]*"
                            />


                            <TextField
                                onChange={this.changemacroblocksize}
                                required
                                id="outlined-required"
                                label="MacroBlock size :"
                                defaultValue="327680"
                                sx={{ m: 1, width: '70ch' }}
                                type="number"
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                inputmode="numeric"
                                pattern="[0-9]*"
                            />



                            <TextField
                                onChange={this.changemacroblockspare}
                                required
                                id="outlined-required"
                                label="Macro block spare:"
                                defaultValue="32768"
                                sx={{ m: 1, width: '70ch' }}
                                type="number"
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                inputmode="numeric"
                                pattern="[0-9]*"
                            />






                            <TextField
                                onChange={this.changemacroblockpreallocation}
                                required
                                id="outlined-required"
                                label="MacroBlock preallocation:"
                                defaultValue="300"
                                sx={{ m: 1, width: '70ch' }}
                                type="number"
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                inputmode="numeric"
                                pattern="[0-9]*"
                            />
                            <TextField
                                onChange={this.changemacroblockbatchallocation}
                                required
                                id="outlined-required"
                                label="MacroBlock batch allocation:"
                                defaultValue="300"
                                sx={{ m: 1, width: '70ch' }}
                                type="number"
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                inputmode="numeric"
                                pattern="[0-9]*"
                            />


                        </div>


                    </form>
                    <hr class="rounded"></hr>

                </div>
                {/*//////////////////////////////////////// < End of BLock    >/////////////////////////////////////////////////////////////////////////////////*/}
                {/*//////////////////////////////////////// < Cache    >////////////////////////////////////////////////////////////////////////////////////////*/}

                <div className='Cache'>
                    <h1>Cache</h1>
                    <form>

                        <TextField
                            onChange={this.changemacroblockscache}

                            id="outlined-required"
                            label="Macro blocks cache:"
                            defaultValue="2500"
                            sx={{ m: 1, width: '70ch' }}
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            inputmode="numeric"
                            pattern="[0-9]*"
                        />

                        <TextField
                            onChange={this.changenodescache}

                            id="outlined-required"

                            label="Nodes Cache :"


                            defaultValue="10000"
                            sx={{ m: 1, width: '70ch' }}

                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            inputmode="numeric"
                            pattern="[0-9]*"

                        />

                    </form>
                    <hr class="rounded"></hr>
                </div>
                {/*//////////////////////////////////////// <End  Cache    >////////////////////////////////////////////////////////////////////////////////////////*/}
                {/*//////////////////////////////////////// <Compressor   >////////////////////////////////////////////////////////////////////////////////////////*/}
                <div className='Compressor'>

                    <h1>Compressor</h1>


                    <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Compressor: "
                        sx={{ m: 1, width: '70ch' }}
                        onChange={this.changecompressor}

                        SelectProps={{
                            native: true,
                        }}

                    >
                        {compressoroptions.map((option) => (
                            <option value={option.label}>{option.value}</option>
                        ))}
                    </TextField>






                    <TextField
                        id="outlined-select-currency-native"
                        select
                        label="River Threads: "
                        sx={{ m: 1, width: '70ch' }}
                        onChange={this.changeriverthreads}

                        SelectProps={{
                            native: true,
                        }}

                    >
                        {riverthreads.map((option) => (
                            <option value={option.label}>{option.value}</option>
                        ))}
                    </TextField>


                    <TextField
                        onChange={this.changemaxdeltaqueue}
                        required
                        id="outlined-required"
                        label="Max delta queue:"
                        defaultValue="10"
                        sx={{ m: 1, width: '70ch' }}
                        type="number"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        inputmode="numeric"
                        pattern="[0-9]*"

                    />
                    <div>

                        <button className='createStreambutton1' type="button" name='WWalid' onClick={() => this.createStream(this.state.checklog, this.state.checkdebug, this.state.mulltiplediskmaxqueue, this.state.logicalblocksizeinput, this.state.macroblocksizeinput, this.state.macroblockpreallocationinput, this.state.macroblockbatchallocationinput, this.state.macroblockscache, this.state.nodescache, this.state.maxdeltaqueue, this.state.eventType, this.state.dataofevent)}>
                            CreateStream
                        </button>



                        <button variant="outlined"
                            onClick={this.OpenScheduleDialog}
                            className='DialogSchedule'
                        >
                            Schedule Create Stream
                        </button>
                        <Dialog
                            fullWidth="lg"
                            maxWidth="lg"
                            open={this.state.openschedule}
                            //    onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Select the Date to create the Stream"}
                            </DialogTitle>
                            <DialogContent>

                                <DialogContentText id="alert-dialog-description">

                                </DialogContentText>
                                <div className='Schedulebox'>


                                    <div className='Shedule1'><h3>Job start at</h3></div>
                                    <div className='Shedule2' >
                                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                                            <DateTimePicker
                                                renderInput={(props) => <TextField {...props} />}
                                                label="DateTimePicker"
                                                value={this.state.dateCreateStream}
                                                onChange={this.UpdateDate}


                                            />
                                        </LocalizationProvider>
                                    </div>
                                    <div className='Shedule3'><h3>And repeats every</h3></div>
                                    <div className='Shedule4'>
                                        <TextField
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





                                </div>





                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={this.CloseScheduleDialog}
                                >Close</Button>
                                <Button
                                    onClick={this.setTimerCreateStream}
                                    autoFocus>
                                    Set
                                </Button>
                            </DialogActions>
                        </Dialog>






                    </div>

                    {/*//////////////////////////////////////// <End of Comüpressor  >////////////////////////////////////////////////////////////////////////////////////////*/}

                </div >
                <ToastContainer />

            </div>


        )
    }
}

export default CreateStreamScreen
