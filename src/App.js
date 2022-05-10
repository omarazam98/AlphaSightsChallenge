import './App.css';
import React, {useCallback, useEffect, useState} from "react";

function App() {
    const [flights, setFlights] = useState([])
    const [rotations, setRotations] = useState([])


    const filterArrayByID = useCallback((id, array) => array.filter((arr) => id !== arr.id),[])

    const handleAdd = useCallback((array) => {
        setFlights(filterArrayByID(array.id, flights))
        setRotations([...rotations, array])
    }, [flights, rotations])

    const handleRemove = useCallback((array) => {
        setRotations(filterArrayByID(array.id, rotations))
        setFlights([...flights, array])
    }, [flights, rotations])

    useEffect(() => {
        fetch("https://infinite-dawn-93085.herokuapp.com/flights").then(async (res) => {
            const flights = await res.json()
            setFlights(flights.data)
        })
    }, [])

  return (
    <div className="App">
      <div className={"rotationContainer"}>
          <h3 style={{textAlign: "center", marginTop: "20vh", marginBottom: "5vh"}}>Rotations</h3>
          {rotations.map((flight) =>
              <div className={"cardContainer"}>
                  <div>
                      <h6>{"Flight: " + flight.id}</h6>
                      <h5>{flight.origin}</h5>
                      <h5>{flight.readable_departure}</h5>
                  </div>
                  <div className={"rightCard"}>
                      <button onClick={() => handleRemove(flight)}>Remove</button>
                      <h5>{flight.destination}</h5>
                      <h5>{flight.readable_arrival}</h5>
                  </div>
              </div>
          )}
      </div>
      <div className={"flightContainer"}>
          <h3 style={{textAlign: "center", marginTop: "20vh", marginBottom: "5vh"}}>Flights</h3>
          {flights.map((flight) =>
              <div className={"cardContainer"}>
                  <div>
                      <h6>{"Flight: " + flight.id}</h6>
                      <h5>{flight.origin}</h5>
                      <h5>{flight.readable_departure}</h5>
                  </div>
                  <div className={"rightCard"}>
                      <button onClick={() => handleAdd(flight)}>Add</button>
                      <h5>{flight.destination}</h5>
                      <h5>{flight.readable_arrival}</h5>
                  </div>
              </div>
          )}
      </div>
    </div>
  );
}

export default App;
