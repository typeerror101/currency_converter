import React, {useEffect, useState} from 'react';
import './App.css';
import CurrencyRow from './currencyRow';

const base_URL = "https://v6.exchangerate-api.com/v6/aa53957d1994a97e71bdb4e9/latest/USD"

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  console.log(toCurrency)
  useEffect(() => {
    fetch(base_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.conversion_rates)[1]
        setCurrencyOptions([data.base_code, ...Object.keys(data.conversion_rates)])
        setFromCurrency(data.base_code)
        setToCurrency(firstCurrency)
      })
  }, [])

  return (
    <>
      <h1>Currency Converter</h1>
      <CurrencyRow 
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
      />
      <div className="equals">=</div> 
      <CurrencyRow 
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}

      />
    </>
  );
}

export default App;
