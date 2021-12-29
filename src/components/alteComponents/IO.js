import React, { Component } from 'react'
import './io.css'

class IO extends Component {

  constructor(props) {
    super(props)


    this.state = {
      datafilesinput: '',
      translationfilesinput: '',
      bootfileinput: '',
      mulltiplediskmaxqueue: ''


    }
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









  render() {
    return (
      <div className='IO'>
        <h1> I/O </h1>
        <form>
          <div className='iodiv'>
            <label >
              <label>DataFiles:</label>
              <input class='datafilesinput' type="text" name="name" value={this.state.datafilesinput} onChange={this.changedatafiles} />
            </label>
          </div>
          <div className='iodiv'>
            <label>
              <label>Translationfiles:</label>
              <input class='translationfilesinput' type="text" name="name" value={this.state.translationfilesinput} onChange={this.changetranslationfiles} />
            </label>
          </div>
          <div className='iodiv'>
            <label>
              <label>Boot file:</label>
              <input class='bootfilesinput' type="text" name="name" value={this.state.bootfileinput} onChange={this.changebootfileinput} />
            </label>
          </div>
        </form>
        <div class="custom-select">
          <label> Multiple disk max queue: </label>
          <select value={this.state.multiplediskmaxqueue} onChange={this.changemultiplediskmaxqueue}>
            <option value="0">10</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>

          </select>
        </div>
        <hr class="rounded"></hr>




      </div>
    )
  }
}

export default IO
