import React, { Component } from 'react'
import './cache.css'

export class Cache extends Component {

    
  constructor(props) {
    super(props)


    this.state = {
        macroblockscache: '',
        nodescache: '' 
    }

  }

  
  changemacroblockscache =  event => {
    this.setState({
        macroblockscache: event.target.value
    }, () => {console.log( 'Macro blocks cache :' ,this.state.macroblockscache)
  
    })
  }

  
  changenodescache =  event => {
    this.setState({
        nodescache: event.target.value
    }, () => {console.log( 'Nodes Cache :' ,this.state.nodescache)
  
    })
  }









    render() {
        return (
            <div  className = 'Cache'>
               <h1>Cache</h1> 
               <form>
                   
                   <label> Macro blocks cache :</label>
               <label >
    <input   class='macroblockscache' type="text" name="name" value={this.state.macroblockscache} onChange={ this.changemacroblockscache }/>
    </label>
  
 
                   <label classname = 'nodecashelabel'> Nodes Cache :</label>
               <label >
    <input   class='nodescache' type="text" name="name"   value={this.state.nodescache} onChange={ this.changenodescache } />
    </label>


               </form>
               <hr class="rounded"></hr>

            </div>
          
        )
    }
}

export default Cache