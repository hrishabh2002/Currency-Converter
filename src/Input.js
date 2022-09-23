import React from 'react'

function Input(props) {

  const{
    curOpt,selectCur,handleChange,amount,handleamountChange
  }=props
  return (
    <div>
       <input type="number" value={amount} onChange={handleamountChange}/>
       <select value={selectCur} onChange={handleChange}>
        {
          curOpt.map((opt)=>{
           return <option value={opt}>{opt}</option>
          })
        }
      
    </select>
    </div>
  )
}

export default Input;