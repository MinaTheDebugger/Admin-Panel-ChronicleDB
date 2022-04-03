import React, { Component } from 'react'

import Appbar from './Appbar';
import Java from '../Java/Java';



export default class JavaScreen extends Component {
    render() {
        return (
            <div>
                <Appbar />
                <Java />
            </div>
        )
    }
}

