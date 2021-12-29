import React, { Component } from 'react'
import '../components/alteComponents/block.css'

export default class Aboutmainscreen extends Component {
    render() {
        const info1 = "Vendor: GenuineIntel"
        const info2 = "APIC ID: 2"
        const info3 = "x2APIC ID: 2"
        const info4 = "Family: 6"
        const info5 = "Extended Family: 0"
        const info6 = "Model: 158"
        const info7 = "Extended Model: 9"
        const info8 = "Stepping: 9"
        const info9 = "Brand Index: 0"
        const info10 = "Serial#: 0"
        const info11 = "CPU Cores/Threads: 4/8"
        return (
            <div className='Block'>
                <h1 >{info1}</h1>
                <h1 >{info2}</h1>
                <h1 >{info3}</h1>
                <h1 >{info4}</h1>
                <h1 >{info5}</h1>
                <h1 >{info6}</h1>
                <h1 >{info7}</h1>
                <h1 >{info8}</h1>
                <h1 >{info9}</h1>
                <h1 >{info10}</h1>
                <h1 >{info11}</h1>
            </div>
        )
    }
}
