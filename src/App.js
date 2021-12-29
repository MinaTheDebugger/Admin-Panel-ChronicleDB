
import React, { Component } from 'react';
import Leftbar from './components/alteComponents/Leftbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../src/screens/Home'
import About from '../src/screens/About'
import CreateStream from '../src/screens/Createstream'
import history from './components/alteComponents/history';



class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Leftbar />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/About">
              <About />
            </Route>
            <Route exact path="/CreateStream">
              <CreateStream />
            </Route>
          </Switch>
        </div>
      </Router>
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