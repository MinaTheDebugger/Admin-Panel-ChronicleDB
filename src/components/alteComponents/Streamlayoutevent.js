import React, { Component } from 'react';
import './streamlayoutevent.css'
/*
const headerStyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial",
    textAlign: "center",
    height: "50px"
};
*/
/*
const boxStyle = {
    backgroundColor: "LightGrey",
    fontFamily: "TimesNewRoman",
    height: "50px",
    fontSize: "40px",
    width: "400px",
    textAlign: "center"
}
*/


const options = [
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

class Streamlayoutevent extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            datatype: 'empty'

        }
    }
/*
    setDatatype(value) {
        this.dataType = value
    }
*/




StreamEventLayoutChange = event => {
  this.setState({ 
    datatype: event.target.value
    
 }, () => { console.log('Stream Event Layout:',this.state.datatype )
 }
  )
 
}

    render() {
     
     
        return <div   className= 'streamEventlayout' >
               <h1>Stream Event Layout</h1>
               <label  >Data Type: </label>  
            <select className='selectboxstream' value={this.state.datatype} onChange={this.StreamEventLayoutChange} >
            {options.map((option) => (
              <option value={option.label}>{option.value}</option>
            ))}
            </select>
            <hr class="rounded"></hr>
</div>

    }
}
export default  Streamlayoutevent 