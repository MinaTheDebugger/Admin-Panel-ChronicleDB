import React, { Component } from 'react'
import './compressor.css'
import axios from "axios";


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
async function performGetReq() {
  console.log("its working");
  const url = 'localhost:8000/system_load'

  try {
    const response = await axios(url);
    const data = await response.data;
    alert(JSON.stringify(data))
    console.log(data) 
  } catch (err) {
    console.error(`Error is -->  ${err}`)
    alert(err)
  }
}
async function showStreams() {
  console.log("its working");
  const url = 'localhost:8000/show_streams'

  try {
    const response = await axios(url);
    const data = await response.data;
    alert(JSON.stringify(data))
    console.log(data) 
  } catch (err) {
    console.error(`Error is -->  ${err}`)
    alert(err)
  }
}
class Compressor extends Component {

  constructor(props) {
    super(props)


    this.state = {
      compressor: 'empty',
      riverthreads: 'empty',
      maxdeltaqueue: 0
    }
  
  }

  changecompressor = event => {
    this.setState({
      compressor: event.target.value

    }, () => {console.log('Compressor:', this.state.compressor)
  
    }
    )

  }
  changeriverthreads = event => {
    this.setState({
      riverthreads: event.target.value

    }, () => {console.log('River Threads:', this.state.riverthreads)
  
    }
    )
  }

  changemaxdeltaqueue =  event => {
    this.setState({
      maxdeltaqueue: event.target.value
    }, () => {console.log( 'Max delta queue :' ,this.state.maxdeltaqueue)
  
    })
  }






  render() {
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
            <input class='maxdeltaqueue' type="text" name="name" value={this.state.maxdeltaqueue}  onChange={ this.changemaxdeltaqueue }/>
          </label>
        </div>
        <button onClick={performGetReq}>get System_load</button>
        <button onClick={showStreams}>show all Streams</button>
        <button onClick={showStreams}>get System Info</button>

      </div>
    )
  }
}

export default Compressor