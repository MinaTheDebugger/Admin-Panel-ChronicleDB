import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import { FormControlLabel } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';


import history from './alteComponents/history';

import Switch from '@mui/material/Switch';
import { TextField, } from '@mui/material';
import '../components/alteComponents/debug.css'
import Cookies from 'js-cookie';

import '../components/createStreamScreen.css'





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


const optionsofstreameventlayout = [
    {
        label: "Empty",
        value: "Empty",
    },
    {
        label: "U8:0",
        value: "U8",
    },
    {
        label: "I8:0",
        value: "I8",
    },
    {
        label: "U16:0",
        value: "U16",
    },
    {
        label: "U2:0",
        value: "U32",
    },
    {
        label: "I32:0",
        value: "I32",
    },
    {
        label: "F32:0",
        value: "F32",
    },
    {
        label: "U64:0",
        value: "U64",
    },
    {
        label: "I64:0",
        value: "I64",
    },
    {
        label: "F64:0",
        value: "F64",
    },
    {
        label: "ConstString",
        value: "ConstString",
    },
    {
        label: "VarString",
        value: "VarString",
    },
    {
        label: "ConstU8List",
        value: "ConstU8List",
    },
    {
        label: "ConstI8List",
        value: "ConstI8List",
    },

    {
        label: "ConstU16List",
        value: "ConstU16List",
    },
    {
        label: "ConstI16List",
        value: "ConstI16List",
    },
    {
        label: "ConstU32List",
        value: "ConstU32List",
    },
    {
        label: "ConstU32List",
        value: "ConstU32List",
    },
    {
        label: "ConstI32List",
        value: "ConstI32List",
    },
    {
        label: "ConstF32List",
        value: "ConstF32List",
    },
    {
        label: "ConstU64List",
        value: "ConstU64List",
    },
    {
        label: "ConstI64List",
        value: "ConstI64List",
    },
    {
        label: "ConstF64List",
        value: "ConstF64List",
    },
    {
        label: "VarU8List",
        value: "CVarU8List",
    },
    {
        label: "VarI8List",
        value: "VarI8List",
    },
    {
        label: "VarU16List",
        value: "VarU16List",
    },
    {
        label: "VarI16List",
        value: "VarI16List",
    },
    {
        label: "VarU32List",
        value: "VarU32List",
    },
    {
        label: "VarI32List",
        value: "VarI32List",
    },
    {
        label: "VarF32List",
        value: "VarF32List",
    },
    {
        label: "VarU64List",
        value: "VarU64List",
    },
    {
        label: "VarU64List",
        value: "VarU64List",
    },
    {
        label: "VarF64List",
        value: "VarF64List",
    },
    {
        label: "Compound",
        value: "FixedCompound",
    },
    {
        label: "VarCompound",
        value: "VarCompound",
    }


];


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
        }

    }
    changelog = event => {

        this.setState(prevState => ({
            checklog: !prevState.checklog
        }), console.log('Log is checked :', this.state.checklog))


    }
    /*
    , () => {
        console.log('Log is checked :', this.state.checklog)

    })
}

*/

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
    changedatafiles = event => {
        this.setState({
            datafilesinput: event.target.value
        }, () => {
            console.log('DataFiles: ', this.state.datafilesinput)

        })
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

    createStreamTest = () => {
        console.log("its working");
        const url = 'http://localhost:8000/create_stream'
        console.log(this.state.passedmacroblockscache + "CreateStream method");
        const objectTest = `
        [Debug]#
          Log							= ${this.state.checklog}
        
          # All the dynamic TAB+Index optimized sizes are discarded and
          # the minimum size for the nodes is used instead, if set to true. 
          # These minimum sizes are:
          # 	- Index Data Size 			:= 3 Keys   / Node.
          # 	- Leaf Data Size  			:= 2 Events / Node.
          # Otherwise, calculates the most suitable TAB+Index sizes. and hi
          Debug							= ${this.state.checkdebug}
        
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
          Multiple disk max queue 		= ${this.state.mulltiplediskmaxqueue}
          
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
          Event 							= {"VarCompound":[{"U64":0},{"I64":0},{"F64":0.0},{"VarString":"Hallo-Welt"}]}
          
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
          LogicalBlock size 				= ${this.state.logicalblocksizeinput}
          
          # Number of bytes for a MacroBlock.
          # Denoted in a multiply of Logical Block Size.
          # The multiply value must be a decimal number and never 0.
          MacroBlock size 				= ${this.state.macroblocksizeinput}
          
          # Percent of spare space in a MacroBlock.
          MacroBlock spare				= 0.1
          
          # Number of MacroBlocks to preallocate at start.
          MacroBlock preallocation 		= ${this.state.macroblockpreallocationinput}
          
          # Allocates a number of MacroBlocks, when MacroBlockPreallocation
          # is exhausted.
          # 0								:= Batch allocator disabled.
          # n, where n is greater or equal to MacroBlockPreallocation.
          MacroBlock batch allocation		= ${this.state.macroblockbatchallocationinput}
          
        [Cache]#
          # Number of MacroBlocks to keep in memory in LRU i.e. cache.
          MacroBlocks cache				= ${this.state.macroblockscache}
          
          # Number of Nodes to keep in memory in LRU i.e. cache.
          Nodes cache						= ${this.state.nodescache}
          
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
          Max delta queue					= ${this.state.maxdeltaqueue}
          
          
          
          
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

            })
            .catch(function (error) {
                console.log(error.message);
                //alert(error.message)
            })
        return


    }

    render() {
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



                    <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Data Type:"
                        sx={{ m: 1, width: '70ch' }}
                        onChange={this.StreamEventLayoutChange}

                        SelectProps={{
                            native: true,
                        }}

                    >
                        {optionsofstreameventlayout.map((option) => (
                            <option value={option.label}>{option.value}</option>
                        ))}
                    </TextField>

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
                        <Link to={{
                            pathname: "/Home",
                            state: { fromDashboard: "Stream Data :" + this.state.compressor + " " + this.state.riverthreads + " " + this.state.maxdeltaqueue }
                        }}>
                            <button className='createStreambutton1' type="button" name='WWalid' onClick={this.createStreamTest}>
                                CreateStream
                            </button>
                        </Link>
                    </div>

                    {/*//////////////////////////////////////// <End of Comüpressor  >////////////////////////////////////////////////////////////////////////////////////////*/}

                </div >


            </div>


        )
    }
}

export default CreateStreamScreen
