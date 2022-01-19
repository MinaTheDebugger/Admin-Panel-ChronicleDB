
import React, { Component } from 'react';
import Leftbar from './components/alteComponents/Leftbar';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../src/screens/Home'
import About from '../src/screens/About'
import CreateStream from '../src/screens/Createstream'
import history from './components/alteComponents/history';
import LoginScreen from './screens/LoginScreen';
import { Registerscreen } from './screens/Registerscreen';
import axios from "axios";
import AuthApi from './AuthApi';











class App extends Component {


  constructor(props) {
    super(props)


    this.state = {
      loggedInStatus: "200",
      userEmail: '',
      auth: true
    }
  }


  Routes = () => {



    return (
      <Switch>

        <Route exact path="/">
          <LoginScreen />
        </Route>
        <this.ProtectedRoute exact path="/register" >
          <Registerscreen />
        </this.ProtectedRoute>

        <Route exact path="/Home">
          <Home />
        </Route>
        <Route exact path="/About">
          <About />
        </Route>
        <Route exact path="/CreateStream">
          <CreateStream />
        </Route>
      </Switch>
    )
  }



  ProtectedRoute = ({ component: Component, ...rest }) => {

    const walid = false;
    return (
      <Route
        {...rest}
        render={() => walid ? (
          <Home />
        ) :
          (<Redirect to={{ pathname: "/Home" }} />
          )

        }
      />

    )
  }




  checkLoginStatus() {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(response => {
        if (
          response.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user
          });
        } else if (
          !response.data.logged_in &
          (this.state.loggedInStatus === "LOGGED_IN")
        ) {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
          });
        }
      })
      .catch(error => {
        console.log("check login error", error);
      });
  }


  /*
 
 
 
   ProtectHomescreen = () => {
     const walid = true;
     return (
 
       < Switch >
         <Route exact path="/">
           <LoginScreen />
         </Route>
 
 
         <Route
           render={() => walid ? (
             <Home />
           ) :
             (<Redirect to={{ pathname: "/" }} />
             )
 
           } />
       </Switch >
     )
   }
     */


  ProtectHomeScreen = () => {
    const walid = false;
    return (
      < Switch >
        <Route
          render={() => walid ? (
            <Home />
          ) :
            (<Redirect to={{ pathname: "/" }} />
            )
          } />
      </Switch >
    )
  }

  ProtectCreateStream = () => {
    const walid = false;
    return (
      < Switch >
        <Route
          render={() => walid ? (
            <CreateStream />
          ) :
            (<Redirect to={{ pathname: "/" }} />
            )
          } />
      </Switch >

    )
  }


  ProtectAbout = () => {
    const walid = false;
    return (
      < Switch >
        <Route
          render={() => walid ? (
            <About />
          ) :
            (<Redirect to={{ pathname: "/" }} />
            )
          } />
      </Switch >

    )
  }









  render() {
    return (

      <div className="App">

        <Router history={history}>
          <Switch>
            <Route exact path="/">
              <LoginScreen />
            </Route>
          </Switch>

          <Switch>
            <this.ProtectHomeScreen exact path="/Home">
              <Home />
            </this.ProtectHomeScreen>
          </Switch>


          <Switch>
            <this.ProtectCreateStream exact path="/CreateStream">
              <CreateStream />
            </this.ProtectCreateStream>
          </Switch>


          <Switch>
            <this.ProtectAbout exact path="/About">
              <About />
            </this.ProtectAbout>
          </Switch>

          <Switch>


          </Switch>
          <Route exact path="/register">
            <Registerscreen />
          </Route>


        </Router>
      </div>

    )
  }
}


/*
async function performGetReq() {
  console.log("its working");
  const url = 'https://api.npms.io/v2/search?q=react'
  //toDo  change URL with the one from Localhost (From the Rust-Project)
  try {
    const response = await axios(url);
    const data = await response.data.results;
    alert(JSON.stringify(data))
    console.log(data) 
  } catch (err) {
    console.error(`Error is -->  ${err}`)
  }
 
}
*/
//function underConstr() {
// alert("noch nicht implementiert !")
//}

/*
  return (
    <div>
      <h1 style={{'text-align' : 'center'}} >Admin Panel for ChronicalDB </h1>
      <button onClick={performGetReq}>
        performGetReq
      </button>
      <button onClick={underConstr}>
        performPostReq
      </button>
      <button onClick={underConstr}>
        performDelReq
      </button>
      <button onClick={underConstr}>
        performPutReq
      </button>
    </div>
  */




export default App;