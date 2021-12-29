import React, { Component } from 'react'
import Aboutmainscreen from '../componentsofabout/Aboutmainscreen'
import Title from '../components/alteComponents/Title';

export default class About extends Component {
    render() {
        return (
            <div>
                <Title />
                <Aboutmainscreen />
            </div>
        )
    }
}
