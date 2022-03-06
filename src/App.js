
import React, { Component } from 'react';

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../src/screens/Home'
import About from '../src/screens/About'
import CreateStream from '../src/screens/Createstream'
import history from './components/alteComponents/history';
import LoginScreen from './screens/LoginScreen';
import Registerscreen from './screens/Registerscreen';
import axios from "axios";

import Cookies from 'js-cookie';
import Jobscreen from './screens/Jobscreen';















class App extends Component {


  constructor(props) {
    super(props)


    this.state = {
      loggedInStatus: "200",
      userEmail: '',
      auth: Cookies.get('User1'),
      push: true
    }
  }

  /*
    componentWillUnmount() {
      const currentPathName = window.location.href;
      this.gotoHome()
      if (Cookies.get('User1') && currentPathName == 'http://localhost:3000/') {
  
  
        history.push("/Home");
        //   window.location.reload();
      }
    }
  
  */
  /*
    componentDidMount() {
      const currentPathName = window.location.href;
  
      setInterval(() => {
        this.gotoHome()
  
        if (Cookies.get('User1') && currentPathName == 'http://localhost:3000/') {
  
  
          history.push("/Home");
          //  window.location.reload();
        }
      })
  
    }
  
  */


  componentDidMount() {
    const currentPathName = window.location.href;



    setInterval(() => {
      this.gotoHome()

      //  alert(currentPathName)


      if (Cookies.get('User1') && currentPathName === 'http://localhost:3000/') {


        history.push("/Home");
        window.location.reload();
        //    alert(this.state.push)
        this.setState({
          push: false
        })


        Cookies.set('refresh', false, { expires: 7 })
        //    alert(this.state.push)

      }
    })

  }












  /*
    componentDidMount() {
   
      setInterval(() => {
        this.setState({
          auth: Cookies.get('User1')
        })
   
      }
    }
   
  */





  /*
    ff() {
      setInterval(() => {
        this.setState({
          auth: Cookies.get('User1')
        })
      }, 1000);
    }
   
  */




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








  gotoHome = () => {
    //const currentPathName = window.location.href;
    this.setState({
      auth: Cookies.get('User1')
    }

    )


  }



  render() {
    return (

      <div className="App">

        {//this.ff
        }
        {
          //  alert("ssssssssssss")
        }

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