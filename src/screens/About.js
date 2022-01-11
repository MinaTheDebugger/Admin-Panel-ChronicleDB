import React, { Component } from 'react'
import Aboutmainscreen from '../componentsofabout/Aboutmainscreen'
import Title from '../components/alteComponents/Title';
import Leftbar from '../components/alteComponents/Leftbar';

export default class About extends Component {
    render() {
        return (
            <div>
                <Title />
                <Leftbar />
                <Aboutmainscreen />
            </div>
        )
    }
}
