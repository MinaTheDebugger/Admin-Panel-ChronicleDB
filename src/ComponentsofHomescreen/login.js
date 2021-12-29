import React, { Component } from 'react'
import axios from 'axios'


async function signUp(email, password, name, phonenumber) {
    try {
        const signUpDetails = {
            name: name,
            email: email,
            phonenumber: phonenumber,
            password: password
        };
        const response = await axios.post('127.0.0.1:5000/user/register', signUpDetails)
        console.log(response.data)
    } catch (err) {
        console.error(err)
    }
}

async function signIn(params) {

}


export class login extends Component {















    render() {
        return (
            <div>

            </div>
        )
    }
}

export default login
