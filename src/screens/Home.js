import React, { Component } from 'react';
import Title from '../components/alteComponents/Title';
import Leftbar from '../components/alteComponents/Leftbar'
import Homepage from '../ComponentsofHomescreen/Homepage'
import Appbar from './Appbar';



class Home extends Component {
    render() {
        return (
            <div className="App">

                <Appbar />
                <Homepage />

            </div >

        )
    }
}


export default Home;