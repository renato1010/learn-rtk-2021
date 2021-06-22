import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { incremented, amountAdded } from "./features/counter/counter.slice";
import { useFetchBreedsQuery } from "./features/dogs/dogs.api.slice";
import logo from "./logo.svg";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);
  const [numDogs, setNumDogs] = useState(5);
  const { data = [], error, isLoading } = useFetchBreedsQuery(numDogs);
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => dispatch(incremented())}>
            count is: {count}
          </button>
        </p>
        <div>
          <p>Dogs to fetch:</p>
          <select
            style={{ padding: "6px", font: "500 1.4em Arial" }}
            value={numDogs}
            onChange={(e) => setNumDogs(+e.target.value)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
        <div>Number of dogs fetched: {data.length}</div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {data.map((breed) => (
              <tr key={breed.id}>
                <td>{breed.name}</td>
                <td>
                  <img src={breed.image.url} alt={breed.name} height="250" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
