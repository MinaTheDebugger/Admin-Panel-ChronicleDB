import React, { Component } from 'react'
import Aboutmainscreen from '../componentsofabout/Aboutmainscreen'

import Appbar from './Appbar';


export default class About extends Component {
    render() {
        return (
            <div>
                <Appbar />
                <Aboutmainscreen />
            </div>
        )
    }
}
