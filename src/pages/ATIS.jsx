import React, { useEffect, useState } from "react";

import './ATIS.css';

const liveATISList = [];
const defaultATISList = ["KMIA", "KFLL", "KTPA", "KRSW", "KPBI"];

function resetArray(array) {
  while (array.length > 0) {
    array.pop();
  }
}

async function updateATIS(atisList) {
  if (!Array.isArray(atisList)) {return 'Error: Incorrect data type, expected Array'};
  resetArray(liveATISList);

  for (const airport of atisList) {
    try {
      const response = await fetch(`https://corsproxy.io/?url=` + encodeURIComponent(`https://datis.clowd.io/api/${airport}`));
      const data = await response.json();
      
      switch(data.length) {
        case 1:
          liveATISList.push(data[0]);
          console.log(data[0]);
          break;
        case 2:
          liveATISList.push(data[0]);
          console.log(data[0]);
          liveATISList.push(data[1]);
          console.log(data[1]);
          break;
        default:
          console.log(`Live ATIS JSON returned ${data.length} results`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

updateATIS(defaultATISList);
setInterval(updateATIS, 4 * 60 * 1000, defaultATISList);

export const ATISPage = () => {
  const [backendData, setBackendData] = useState([{}]);

  /*
  useEffect(() => {
    fetch('http://localhost:5000/api/currentATISList')
      .then(res => res.json())
      .then (data => {
        console.log(data)
      }
    )
    .catch(error => {console.log(error)})
  }, [])
  */

  return (
    <aside>
      <div className="sidebar">
        {(typeof backendData === 'undefined') ? (
          <p>Loading current ATISs...</p>
        ):(
          liveATISList.map((value, index) => (
            <div key={index}>
              <div class="flight-block">
                <div class="flight-header">
                  <div class="flight-name">
                    <h2 className="airport-code">{value.airport}{value.type === "arr" ? "/A" : value.type === "dep" ? "/D" : ""}</h2>
                  </div>
                  <div class="flight-code">
                    <span class="code-letter">{value.code}</span>
                  </div>
                </div>

                <div class="airport-details">
                  <div class="info">
                    <p>{value.datis.split('.')[0]}{value.datis.split('.')[1]}</p>
                  </div>

                  <div class="status-actions-container">
                    <div class="actions">
                      <p>Arriving</p>
                      <button>ILS 8R</button>
                      <button>ILS 9</button>
                      <button>ILS 12</button>
                      <button>RNAV or GPS 8L</button>
                    </div>

                    <div class="status">
                      <p>Status</p>
                      <p class="status-active">Active</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div class="wrapper">
        <section class="container">
            <button class="blue-button">NOTAMS</button>
            <button class="blue-button">WEATHER</button>
            <button class="blue-button">FREQUENCIES</button>
            <button class="blue-button">MAPS / CHARTS</button>
            <button class="blue-button">AIRPORT INFO</button>
            <button class="blue-button">PHONE NUMBERS</button>
            <button class="blue-button" disabled>UNKNOWN</button>
            <button class="blue-button" disabled>UNKNOWN</button>
            <button class="grey-button unassigned" disabled>UNASSIGNED</button>
            <button class="grey-button unassigned" disabled>UNASSIGNED</button>
            <button class="grey-button unassigned" disabled>UNASSIGNED</button>
            <button class="grey-button unassigned" disabled>UNASSIGNED</button>

            <button class="blue-button">MESSAGES</button>
            <button class="blue-button">TRAFFIC MANAGEMENT</button>
            <button class="blue-button">SAA</button>
            <button class="blue-button">UNKNOWN</button>
            <button class="blue-button">UNKNOWN</button>
            <button class="blue-button">EQUIPMENT OUTAGES</button>
            <button class="blue-button" disabled>UNKNOWN</button>
            <button class="blue-button" disabled>UNKNOWN</button>
            <button class="grey-button unassigned" disabled>UNASSIGNED</button>
            <button class="grey-button unassigned" disabled>UNASSIGNED</button>
            <button class="grey-button unassigned" disabled>UNASSIGNED</button>
            <button class="grey-button unassigned" disabled>UNASSIGNED</button>
        </section>
    </div>
    </aside>
  )
}