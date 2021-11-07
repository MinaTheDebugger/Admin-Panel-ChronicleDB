import React from 'react';
import axios from 'axios';

function App() {
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
function underConstr() {
  alert("noch nicht implementiert !")
}
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
  );
}

export default App;