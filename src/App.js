
import React, { Component , useState } from 'react';
import Streamlayoutevent from './components/Streamlayoutevent';
import Title from './components/Title';
import Leftbar from './components/Leftbar'
import Debug from './components/Debug';
import IO from './components/IO'
import Lightweightindex from './components/Lightweightindex';
import Block from './components/Block';
import Cache from './components/Cache';
import Compressor from './components/Compressor';
import axios from "axios";
import LoginForm from './components/LoginForm';
async function performGetReq() {
  console.log("its working");
  const url = 'http://localhost:8000/system_load'
  try {
    const response = await axios(url);
    const data = await response.data.results;
    alert(JSON.stringify(data))
    console.log(data) 
  } catch (err) {
    console.error(`Error is -->  ${err}`)
  }
 
}

function App() {
  const adminUser = { 
    user: "mina",
    password : "admin123"
  }
   const [user , setUser] = useState({name:""});
   const [error , setErorr] = useState("");
   const Login = details => { 
     console.log(details);
     if(details.name == adminUser.user && details.password == adminUser.password) {
       console.log("logged in");
       setUser({
         name: details.name
       })
     } else {
       console.log("wrong username or Password");
       setErorr("wrong username or Password");
     }
   }
   const LogOut = () => { 
    setUser({name:""});
  }


    return (
      <div className="App">
    {(user.name != "") ? (<div className="welcome">
      <h2> <button onClick={LogOut}>Logout </button>      Willkommen ,  Willkommen, <span> {user.name} </span></h2>
      

        <Title/>
        <Leftbar/>
        <Debug/>
        <IO/>
        <Streamlayoutevent />
        <Lightweightindex/>
        <Block/>
        <Cache/>
        <Compressor/>
        </div>) : (<LoginForm Login={Login} error={error}/>)}
    
 </div>
    )
  }








export default App;