import React, {useState, useEffect} from 'react';
import axios from 'axios'
import moment from 'moment-timezone'

import './App.css';

function App() {
  const dates ={}
  const updates = [{date:"Date", amount:"Amount"}]

  const[occurances, setOccurances]=useState(null)

  useEffect(() => {
    const headers = {
      'Content-Type': 'text/plain',
      "Access-Control-Allow-Origin": "*"
  };
    axios.get(`https://life-altert-be.herokuapp.com`,{headers})
    .then(res =>{
        setOccurances(res.data.data)
        console.log(res.data)
    })
    .catch(err => console.log("axios err: ", err))
}, [])

// function formatDate(date) {
//   var d = new Date(date);
//   var hh = d.getHours();
//   var m = d.getMinutes();
//   var s = d.getSeconds();
//   var dd = "AM";
//   var h = hh;
//   if (h >= 12) {
//     h = hh - 12;
//     dd = "PM";
//   }
//   if (h === 0) {
//     h = 12;
//   }
//   m = m < 10 ? "0" + m : m;

//   s = s < 10 ? "0" + s : s;

//   /* if you want 2 digit hours:
//   h = h<10?"0"+h:h; */

//   var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);

//   var replacement = h + ":" + m;
//   /* if you want to add seconds
//   replacement += ":"+s;  */
//   replacement += " " + dd;

//   return date.replace(pattern, replacement);
// }
occurances && occurances.map(el =>{
  // var m = moment.utc(el.time_triggered);
  // m.tz('America/Chicago');
  // var s = m.format("YYYY-MM-DD HH:mm:ss");
  // var localDate = new Date(el.time_triggered).toLocaleString('en-US');
  // console.log(s)
  const date = el.time_triggered.split("T")
  if(dates[date[0]]){
    dates[date[0]] += 1
  } 
  else {
    dates[date[0]] = 1
  }
})

var i;
for (i = 0; i < Object.keys(dates).length; i++) {
  // console.log(Object.entries(dates)[i])
  updates.push({date: Object.keys(dates)[i], amount: Object.values(dates)[i]})

}



  return (
    <div className="App">
      {updates.map(el =>{
        return(
          <div className='container'key={el.date}>
            <h1 className='date'>{el.date}:</h1>
            <h1 className='amount'>{el.amount}</h1>
          </div>
        )
      })}
  
    </div>
  );
}

export default App;
