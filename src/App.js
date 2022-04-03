
import React, { Component } from 'react';

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../src/screens/Home'
import About from '../src/screens/About'
import CreateStream from '../src/screens/Createstream'
import LoginScreen from './screens/LoginScreen';
import Registerscreen from './screens/Registerscreen';
import axios from "axios";
import Cookies from 'js-cookie';
import Jobscreen from './screens/Jobscreen';

import history from './components/alteComponents/history';
import JavaScreen from './screens/JavaScreen';















class App extends Component {


  //constructer and Initial Values

  constructor(props) {
    super(props)


    this.state = {
      loggedInStatus: "200",
      userEmail: '',
      auth: Cookies.get('Isloogedin'),
      push: true
    }
  }



  //Checking if the User is logged in  and send him to Home Page after starting the App
  componentDidMount() {
    const currentPathName = window.location.href;
    setInterval(() => {
      this.getLoggedinStatusfromCookies()
      if (Cookies.get('Isloogedin') && currentPathName === 'http://localhost:3000/') {
        history.push("/Home");
        window.location.reload();
        this.setState({
          push: false
        })
        Cookies.set('refresh', false, { expires: 7 })

      }
    })

  }


  //Sending request to our database to check if the user is logged
  // and to save his data

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



  // Protecting Home Screen from  Users that are not signed in
  ProtectHomeScreen = () => {
    return (
      < Switch >
        <Route
          render={() => this.state.auth ? (
            <Home />
          ) :
            (<Redirect to={{ pathname: "/" }} />
            )
          } />
      </Switch >
    )
  }


  // Protecting Create Stream Page from Users that are not Signed in

  ProtectCreateStream = () => {

    return (
      < Switch >
        <Route
          render={() => this.state.auth ? (
            <CreateStream />
          ) :
            (<Redirect to={{ pathname: "/" }} />
            )
          } />
      </Switch >

    )
  }
  // Protecting About Page from Users that are not Signed in

  ProtectAbout = () => {

    return (
      < Switch >
        <Route
          render={() => this.state.auth ? (
            <About />
          ) :
            (<Redirect to={{ pathname: "/" }} />
            )
          } />
      </Switch >

    )
  }


  // Protecting Job Page from Users that are not Signed in

  ProtectJobs = () => {
    return (
      < Switch >
        <Route
          render={() => this.state.auth ? (
            <Jobscreen />
          ) :
            (<Redirect to={{ pathname: "/" }} />
            )
          } />
      </Switch >

    )
  }

  ProtectJavaScreen = () => {
    return (
      < Switch >
        <Route
          render={() => this.state.auth ? (
            <JavaScreen />
          ) :
            (<Redirect to={{ pathname: "/" }} />
            )
          } />
      </Switch >

    )
  }





  //Get LoggedINStatus from Cookies

  getLoggedinStatusfromCookies = () => {

    this.setState({
      auth: Cookies.get('Isloogedin')
    }
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
            <this.ProtectJobs exact path="/Jobs">
              <Jobscreen />
            </this.ProtectJobs>
            <this.ProtectJavaScreen exact path="/Java">
              <JavaScreen />
            </this.ProtectJavaScreen>
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

export default App;