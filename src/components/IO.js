import React, { Component } from 'react'
import './io.css'

 class IO extends Component {
    render() {
        return (
            <div className = 'IO'>
              <h1> I/O </h1>
                 <form>
               <div className='iodiv'>
           <label >
    <label>DataFiles:</label>
    <input class ='datafilesinput' type="text" name="name" />
  </label>
  </div>
  <div className='iodiv'>
  <label>
   <label>Translationfiles:</label>
    <input class ='translationfilesinput' type="text" name="name" />
  </label>
  </div>
  <div className='iodiv'>
  <label>
    <label>Boot file:</label>
    <input class='bootfilesinput' type="text" name="name" />
  </label>
  </div>
 </form>
 <div class="custom-select">
     <label> Multiple disk max queue: </label>
  <select>
    <option value="0">10</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>

  </select>
</div>
<hr class="rounded"></hr>




            </div>
        )
    }
}

export default IO
