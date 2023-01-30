import React, {useEffect, useState} from 'react';
import './App.css';
import CurrencyRow from './currencyRow';

const base_URL = "https://v6.exchangerate-api.com/v6/aa53957d1994a97e71bdb4e9/latest/USD"

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  
  let toAmount, fromAmount

  if(amountInFromCurrency){
    fromAmount = amount
    toAmount = amount*exchangeRate
  }else{
    fromAmount = amount /exchangeRate
    toAmount = amount
  }

  useEffect(() => {
    if(fromCurrency != null && toCurrency != null){
      //fetch(`${base_URL}?base_code=${fromCurrency}&target_code=${toCurrency}`)
     fetch(`https://v6.exchangerate-api.com/v6/aa53957d1994a97e71bdb4e9/pair/${fromCurrency}/${toCurrency}`)
      .then(res => res.json())
       .then(data => setExchangeRate(data.conversion_rates[toCurrency]))

      
      console.log(exchangeRate)
    }
  }, [fromCurrency, toCurrency])

  useEffect(() => {
    fetch(base_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.conversion_rates)[1]
        setCurrencyOptions([data.base_code, ...Object.keys(data.conversion_rates)])
        setFromCurrency(data.base_code)
        setToCurrency(firstCurrency)
        setExchangeRate(data.conversion_rates[firstCurrency])
      })
  }, [])

  function handleFromAmountChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <>
      <h1>Currency Converter</h1>
      <CurrencyRow 
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency = {e => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <div className="equals">=</div> 
      <CurrencyRow 
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency = {e => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
      />
    </>
  );
}

export default App;
