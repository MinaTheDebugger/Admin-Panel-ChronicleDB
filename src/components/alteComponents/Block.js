import React, { Component } from 'react'
import './block.css'

export class Block extends Component {


  constructor(props) {
    super(props)


    this.state = {
      logicalblocksizeinput: '',
      macroblocksizeinput: '',
      macroblockspareinput: '',
      macroblockpreallocationinput: '',
      macroblockbatchallocationinput: ''
    }

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







  render() {
    return (
      <div className='Block'>
        <h1>Block</h1>
        <form>
          <div className='Macroblocksizediv'>
            <label> Logical block size :</label>
            <label >
              <input class='logicalblocksize' type="text" name="name" value={this.state.logicalblocksizeinput} onChange={this.changelogicalblocksize} />
            </label>
          </div >
          <div className='Macroblocksizediv'>
            <label> MacroBlock size      :</label>
            <label >
              <input class='macroblocksize' type="text" name="name1" value={this.state.macroblocksizeinput} onChange={this.changemacroblocksize} />
            </label>
          </div>
          <div className='Macroblocksizediv'>
            <label> MacroBlock spare      :</label>
            <label >
              <input className='macrospare' type="text" name="name2" value={this.state.macroblockspareinput} onChange={this.changemacroblockspare} />
            </label>
          </div>
          <div className='Macroblocksizediv'>
            <label> MacroBlock preallocation      :</label>
            <label >
              <input className='macropreallocation' type="text" name="name3" value={this.state.macroblockpreallocationinput} onChange={this.changemacroblockpreallocation} />
            </label>
          </div>
          <div className='Macroblocksizediv'>
            <label> MacroBlock batch allocation:</label>
            <label >
              <input className='macrobatch' type="text" name="name4" value={this.state.macroblockbatchallocationinput} onChange={this.changemacroblockbatchallocation} />
            </label>
          </div>


        </form>
        <hr class="rounded"></hr>

      </div>
    )
  }
}

export default Block
