import React, { Component } from 'react'
import Title from '../components/alteComponents/Title';
import CreateStreamScreen from '../components/CreateStreamScreen';

export default class CreateStream extends Component {
    render() {
        return (
            <div>
                <Title />
                <CreateStreamScreen />

            </div>
        )
    }
}
