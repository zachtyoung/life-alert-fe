import React, {useState, useEffect} from 'react';
import axios from 'axios'
import moment from 'moment-timezone'

import './App.css';

function App() {


  const[occurances, setOccurances]=useState(null)
  useEffect(() => {
    axios.get(`https://life-altert-be.herokuapp.com/`)
    .then(res =>{
        setOccurances(res.data.data)
        console.log(res.data)
    })
    .catch(err => console.log("axios err: ", err))
}, [])



  return (
    <div className="App">
      {occurances && occurances.map(el =>{
        var m = moment.utc(el.time_triggered);
        m.tz('America/Chicago');
        var s = m.format("YYYY-MM-DD HH:mm:ss");
        // var localDate = new Date(el.time_triggered).toLocaleString('en-US');
        console.log(s)
        return (
          <div>
            <h1>{s}</h1>
          </div>
        )
      })}
    </div>
  );
}

export default App;
