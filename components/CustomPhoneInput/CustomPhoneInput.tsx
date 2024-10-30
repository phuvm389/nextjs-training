import React, { useState } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const CustomPhoneInput = () => {
  const [value, setValue] = useState()
  const handleOnChange = (value: string) => {
    console.log(value)
  }
  
  return (
    <PhoneInput
        placeholder="Enter phone number"
        value={value}
        onChange={handleOnChange}/>
  )
}

export default CustomPhoneInput