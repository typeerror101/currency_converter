import React from 'react'


const CurrencyRow = (props) => {
  const  {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount
  } = props

  return (
    <div>
    <input  type="number" className ="input" value={amount} onChange={onChangeAmount} />
    <select value={selectedCurrency} className="select" onChange={onChangeCurrency}>
      {currencyOptions.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
  ) 
}

export default CurrencyRow

