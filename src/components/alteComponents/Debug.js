import React, { Component } from 'react'
import './debug.css'




class Debug extends Component {


    constructor(props) {
        super(props)


        this.state = {
            checklog: 'false',
            checkdebug: 'false'
        }

    }
    changelog = event => {
        this.setState({
            checklog: 'true'
        }, () => {
            console.log('Log is checked :', this.state.checklog)

        })
    }
    changedebug = event => {
        this.setState({
            checkdebug: 'true'
        }, () => {
            console.log('Debug is checked :', this.state.checkdebug)

        })
    }


    render() {
        return (
            <div className='Debugboxex'>
                <h1> Debug: </h1>
                <div>
                    <label className='log'>
                        <input type='checkbox' checklog={this.state.checklog}
                            onChange={this.changelog} />
                        <span class='slider' />
                    </label>
                    <label className='logtext'>    Log </label>
                </div>
                <div>
                    <label className='debug'>
                        <input type='checkbox' checkdebug={this.state.checkdebug}
                            onChange={this.changedebug} />
                        <span class='slider' />
                    </label>
                    <label>    Debug </label>
                </div>


                <hr class="rounded"></hr>

            </div>

        )
    }
}

export default Debug