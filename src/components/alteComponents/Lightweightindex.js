import React, { Component } from 'react'
import './lightweightindex.css'

 class Lightweightindex extends Component {


   
    constructor(props) {
        super(props)
        
        this.state = {
            lightweightindex: ''
        }
    }
    changelightweightindex = event => {
        this.setState({ 
            lightweightindex: event.target.value
          
       }, () => { console.log('Lightweight Index:',this.state.lightweightindex )
       }
        )
       
      }


    render() {
        return (
            <div className= 'lightweightindex'>
             <h1>Lightweight Index</h1>
             <label  >Data Type: </label>  
            <select className='selectbox' value={this.state.lightweightindex} onChange={this.changelightweightindex} >
                <option value="EMPTY">EMPTY </option>
                <option value="SMA">SMA </option>
                <option value="Bloomfilter">Bloomfilter </option>
            
            </select>
            <hr class="rounded"></hr>
            </div>
        )
    }
}

export default Lightweightindex
