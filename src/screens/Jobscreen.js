import React, { Component } from 'react'
import Jobs from '../Jobs/Jobs'
import Appbar from './Appbar';

// Screen of Job


export default class Jobscreen extends Component {
    render() {
        return (
            <div>
                <Appbar />
                <Jobs />
            </div>
        )
    }
}
