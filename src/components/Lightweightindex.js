import React, { Component } from 'react'
import './lightweightindex.css'

 class Lightweightindex extends Component {


   
    constructor(props) {
        super(props)
        
        this.state = {
            topic: 'react'
        }
    }
    handletopicChange = event => {
        this.setState( {
            topic: event.target.value
        })
    }


    render() {
        return (
            <div className= 'lightweightindex'>
             <h1>Lightweight Index</h1>
             <label  >Data Type: </label>  
            <select className='selectbox' value={this.state.topic} onChange={this.handletopicChange} >
                <option value="0">EMPTY </option>
                <option value="1">SMA </option>
                <option value="2">Bloomfilter </option>
            
            </select>
            <hr class="rounded"></hr>
            </div>
        )
    }
}

export default Lightweightindex
