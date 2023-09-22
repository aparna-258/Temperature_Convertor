import React, { useState, useRef } from "react";
import "./styles.css";

const celsiusToFahrenheit = degree => parseFloat(degree) * 1.8 + 32;
const fahrenheitToCelsius = degree => (parseFloat(degree) - 32) / 1.8;
const round = num => Math.round((num + Number.EPSILON) * 100) / 100;

export default function App() {
  const [degree, setDegree] = useState("");
  const [conversion, setConversion] = useState("toF");
  const inputRef = useRef(null);
  return (
    <div className="App">
      <h1>Temperature Converter</h1>
      <div>
        <label htmlFor="temperature">Temperature:</label>
        &nbsp;
        <input
          id="temperature"
          autoFocus
          ref={inputRef}
          type="number"
          value={degree}
          onChange={e => setDegree(e.target.value)}
        />
      </div>
      <br />
      <div>
        <input
          id="toF"
          type="radio"
          value="toF"
          name="degrees"
          checked={conversion === "toF"}
          onChange={e => setConversion(e.target.value)}
        />
        <label htmlFor="toF">Celsius to Fahrenheit</label>
      </div>
      <div>
        <input
          id="toC"
          type="radio"
          value="toC"
          name="degrees"
          checked={conversion === "toC"}
          onChange={e => setConversion(e.target.value)}
        />
        <label htmlFor="toC">Fahrenheit to Celsius</label>
      </div>
      <br />
      {degree !== "" && (
        <div data-testid="result">
          {degree}
          {conversion === "toF" ? "ºC" : "ºF"} equals to{" "}
          {conversion === "toF"
            ? round(celsiusToFahrenheit(degree))
            : round(fahrenheitToCelsius(degree))}
          {conversion === "toF" ? "ºF" : "ºC"}
          <div>
            <br />
            <button
              onClick={() => {
                setDegree("");
                inputRef.current.focus();
              }}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}