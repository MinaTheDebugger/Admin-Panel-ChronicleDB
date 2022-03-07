import React, { Component } from 'react'

import CreateStreamScreen from '../components/CreateStreamScreen';

import Appbar from './Appbar';

//Screen of Craete Stream
export default class CreateStream extends Component {
    render() {
        return (
            <div>

                <Appbar />
                <CreateStreamScreen />

            </div>
        )
    }
}
