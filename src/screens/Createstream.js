import React, { Component } from 'react'
import Title from '../components/alteComponents/Title';
import CreateStreamScreen from '../components/CreateStreamScreen';
import Leftbar from '../components/alteComponents/Leftbar';

export default class CreateStream extends Component {
    render() {
        return (
            <div>
                <Title />
                <Leftbar />

                <CreateStreamScreen />

            </div>
        )
    }
}
