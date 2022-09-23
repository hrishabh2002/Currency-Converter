import React,{useEffect, useState} from "react";
import './App.css';
import Input from "./Input";

function App() {


  const[currencyOptions,setCurrencyOptions]=useState([])
  const[fromCurrency,setFromCurrency]=useState()
  const[toCurrency,setToCurrency]=useState()
  const[exchangerate,setExchangerate]=useState();
  const[amount,setAmount]=useState(1);
  const[amountin,setAmountin]=useState(true)

  let fromamount,toamount

  if(amountin){
    fromamount=amount;
    toamount=amount*exchangerate
  }
  else{
    toamount=amount
    fromamount=amount/exchangerate
  }


  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '9920928977mshc57b7ad7e5a84b3p14b21fjsn47be4af5472b',
      'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
    }
  };
  
  const BaseURL='https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=USD&to=EUR%2CGBP'
  const temp='https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest'
 useEffect(()=>{
  fetch(temp, options)
  .then(response => response.json())
  .then(data => {
    const dbase=Object.keys(data.rates)[0];
    setCurrencyOptions([data.base,...Object.keys(data.rates)])
    setFromCurrency(data.base)
    setToCurrency(dbase)
    setExchangerate(data.rates[dbase])
    // console.log(data);
  }
    )
 },[])

 function handlefromAmount(e){
    setAmount(e.target.value)
    setAmountin(true)
 }

 function handletoAmount(e){
  setAmount(e.target.value)
  setAmountin(false)
}

useEffect(()=>{
  if(fromCurrency!=null && toCurrency!=null){
    fetch(`${temp}?base=${fromCurrency}&symbols=${toCurrency}`,options)
    .then(res=>res.json())
    .then(data=>{setExchangerate(data.rates[toCurrency])})
  }
},[fromCurrency,toCurrency])

  return (
    <div className="card">
    <h1>Convert</h1>
    <Input curOpt={currencyOptions} 
    selectCur={fromCurrency} 
    handleChange={event=>setFromCurrency(event.target.value)}
    amount={fromamount}
    handleamountChange={handlefromAmount}
    /> 
    <div className="equal">=</div>
    <Input curOpt={currencyOptions} 
    selectCur={toCurrency}
     handleChange={event=>setToCurrency(event.target.value)}
     amount={toamount}
     handleamountChange={handletoAmount}
      />
    </div>
   
  );
}

export default App;
