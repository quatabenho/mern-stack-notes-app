import React from 'react'

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
const PasswordInput = ({ value, onChange, placeholder}) => {
    const [isShowPassword, setIsShowPassword] = React.useState(false)

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    }
  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
        <input
            value = {value}
            onChange = {onChange}
            type={isShowPassword ? 'text' : 'password'}
            placeholder={placeholder || 'Password'}
            className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'
        />

        <FaRegEye 
            size={22}
            onClick={toggleShowPassword}
            className='text-blue-300 cursor-pointer'
        />
    </div>
  )
}

export default PasswordInput