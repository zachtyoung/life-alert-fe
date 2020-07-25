import React, {useState, useEffect} from 'react';
import axios from 'axios'
import moment from 'moment-timezone'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import './App.css';
import useWindowDimensions from './window'
// const data = [
//   {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
//   {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
//   {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
//   {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
//   {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
//   {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
//   {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
// ];
function App() {
  const dates ={}
  const updates = []
  const { height, width } = useWindowDimensions();


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
  const uDate = date[0].split("2020-")
  if(dates[uDate[1]]){
    dates[uDate[1]] += 1
  } 
  else {
    dates[uDate[1]] = 1
  }
})

var i;
for (i = 0; i < Object.keys(dates).length; i++) {
  // console.log(Object.entries(dates)[i])
  updates.push({date: Object.keys(dates)[i], amount: Object.values(dates)[i]})

}



  return (
    <div className="App">
      {/* {updates.map(el =>{
        return(
          <div className='container'key={el.date}>
            <h1 className='date'>{el.date}:</h1>
            <h1 className='amount'>{el.amount}</h1>
          </div>
           
        )
        
      })} */}
       <LineChart
                width={width}
                height={height}
                data={updates}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis dateKey="date"/>
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
    </div>
  );
}

export default App;
