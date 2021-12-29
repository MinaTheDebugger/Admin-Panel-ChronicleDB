import React, { Component } from 'react'
import './compressor.css'
import axios from "axios";
import { NavLink } from "react-router-dom";
import history from '../history';
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


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
    label: "Mina",
    value: "MINA",
  },
  {
    label: "alright",
    value: "MACH",
  },
  {
    label: "Mer",
    value: "DAS",
  },
]
async function show_system_info() {
  //console.log("its working");
  const url = 'http://localhost:8000/system_info'

  //toDo  change URL with the one from Localhost (From the Rust-Project)
  try {
    const response = await axios(url);
    const data = await response.data;
    alert(data)
    console.log(data)
  } catch (err) {
    console.error(`Error is -->  ${err}`)
  }
}
async function showStreams() {
  //console.log("its working");
  const url = 'http://localhost:8000/show_streams'
  try {
    const response = await axios(url);
    const data = await response.data;
    alert(data)
    console.log(data)
  } catch (err) {
    console.error(`Error is -->  ${err}`)
  }
}








async function shutDownStream(id) {
  //console.log("its working");
  const url = `http://localhost:8000/shutdown_stream/3`
  try {
    const response = await axios(url);
    const data = await response.data;
    alert(data)
    console.log(data)
  } catch (err) {
    console.error(`Error is -->  ${err}`)
  }
}



const routeChange = () => {
  let path = '/CreateStream';
  history.push(path);
}


// const handleClick = () => history.push('/CreateStream');



class Compressor extends Component {

  constructor(props) {
    super(props)


    this.state = {
      compressor: 'empty',
      riverthreads: 'empty',
      maxdeltaqueue: 0,
      passedmacroblockscache: ''


    }

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
    const objectTest = `##########################################################################################
    ##########################################################################################
    ##########################################################################################
    ##########################################################################################
    #####							  													 #####
    ##### Created by   Amir El-Shaikh on 11.03.2021.									 #####
    ##### E-Mail: elshaikh@mathematik.uni-marburg.de							   		 #####
    #####							  													 #####
    ##### @Author: Amir El-Shaikh							  					 	   	 #####
    #####							  													 #####
    #####							  													 #####
    ##### --> Compatible with version: 0.9.49+							  				 #####
    ##########################################################################################
    ##########################################################################################
    ##########################################################################################
    ##########################################################################################
    ############################# ChronicleDB Configuration File #############################
    #############################      Format -> KEY = VALUE     #############################
    
    [Debug]#
      # Enables logs across the system, if log set to true
      # Otherwise logs are disabled.
      Log							= true
    
      # All the dynamic TAB+Index optimized sizes are discarded and
      # the minimum size for the nodes is used instead, if set to true. 
      # These minimum sizes are:
      # 	- Index Data Size 			:= 3 Keys   / Node.
      # 	- Leaf Data Size  			:= 2 Events / Node.
      # Otherwise, calculates the most suitable TAB+Index sizes.
      Debug							= false
    
    [I/O]#	
      # Data files.
      # data = C:\dataFile1
      # data = I:\dataFile2
      # data = H:\dataFile3
      # ...
      Data 							= data0
      #Data 							= data1
      #Data 							= I:\data
      
      # Translation file.
      # This is used to serialize the rightFlank on a clean system shutdown.
      Translation						= translation
      
      # Boot file.
      # This is used to e.g. recover the system and contains information for loaders, such as NodeID counter and root NodeID.
      Boot							= .boot
      
      # Multiple Disk Queue Checkpoint.
      # The number of MacroBlocks allowed to be queued on disk writer thread(s).
      # This number must be much lower than MacroBlock Cache * number of data files.
      Multiple disk max queue 		= 10
      
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
      LogicalBlock size 				= 32768
      
      # Number of bytes for a MacroBlock.
      # Denoted in a multiply of Logical Block Size.
      # The multiply value must be a decimal number and never 0.
      MacroBlock size 				= 10
      
      # Percent of spare space in a MacroBlock.
      MacroBlock spare				= 0.1
      
      # Number of MacroBlocks to preallocate at start.
      MacroBlock preallocation 		= 300
      
      # Allocates a number of MacroBlocks, when MacroBlockPreallocation
      # is exhausted.
      # 0								:= Batch allocator disabled.
      # n, where n is greater or equal to MacroBlockPreallocation.
      MacroBlock batch allocation		= 300
      
    [Cache]#
      # Number of MacroBlocks to keep in memory in LRU i.e. cache.
      MacroBlocks cache				= ${this.state.maxdeltaqueue}
      
      # Number of Nodes to keep in memory in LRU i.e. cache.
      Nodes cache						= 10000
      
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
      River threads 					= t
    
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
        alert(response.data)
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error.message);
        //alert(error.message)
      })
    return


  }









  render() {
    const walid = this.props.passmacroblockcachetocompressoer;
    console.log(walid + " what i want");

    return (
      <div className='Compressor'>
        <div className='firstdiv'>
          <h1>Compressor</h1>
          <label  >Compressor: </label>
          <select className='selectbox2' value={this.state.compressor} onChange={this.changecompressor} >
            {compressoroptions.map((compressoroptions) => (
              <option value={compressoroptions.label}>{compressoroptions.value}</option>
            ))}

          </select>
        </div>
        <div className='secondiv'>
          <label  >River Threads: </label>
          <select className='selectbox3' value={this.state.riverthreads} onChange={this.changeriverthreads} >
            {riverthreads.map((riverthreads) => (
              <option value={riverthreads.label}>{riverthreads.value}</option>
            ))}

          </select>

        </div>
        <div className='maxdelta'>
          <label> Max delta queue :</label>
          <label >
            <input class='maxdeltaqueue' type="text" name="name" value={this.state.maxdeltaqueue} onChange={this.changemaxdeltaqueue} />
          </label>
        </div>
        <Link to={{
          pathname: "/CreateStream",
          state: { fromDashboard: "Stream Data :" + this.state.compressor + " " + this.state.riverthreads + " " + this.state.maxdeltaqueue }
        }}>
          <button type="button" name='WWalid' onClick={this.createStreamTest}>
            CreateStream
          </button>
        </Link>
        <button onClick={showStreams}>show all Streams</button>
        <button onClick={shutDownStream}>shut Down Stream</button>
        <button onClick={show_system_info}>show System Info</button>
        <h1>{this.props.passmacroblockcachetocompressoer}</h1>

      </div >
    )
  }
}

export default Compressor
