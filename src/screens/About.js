import React, { Component } from 'react'
import Aboutmainscreen from '../componentsofabout/Aboutmainscreen'
import Title from '../components/alteComponents/Title';
import Leftbar from '../components/alteComponents/Leftbar';
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
