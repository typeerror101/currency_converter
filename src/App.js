import React, {useEffect, useState} from 'react';
import './App.css';
import CurrencyRow from './currencyRow';

const base_URL = "https://api.exchangeratesapi.io/latest?base=USD&apikey=J0LO11sEZTTFHk4ZhYX0Q02RsUNcF0Xx"

function App() {
  const [currencyOptions,setCurrencyOptions] = useState([])

  useEffect(() => {
    fetch(base_URL)
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
  }, [])

  return (
    <>
      <h1>Currency Converter</h1>
      <CurrencyRow />
      <div className="equals">=</div>
      <CurrencyRow />
    </>
  );
}

export default App;
