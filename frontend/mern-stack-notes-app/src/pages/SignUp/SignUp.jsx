import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'

const SignUp = () => {

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState(null)
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError('Name is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }
   
    setError('');
    
    // Sign Up API Call
    try {
      const response = await axiosInstance.post('/create-account', {
        fullName: name,
        email: email,
        password: password,
      });

      if (response.data && response.data.error) {
        setError(response.data.message);
        return
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong');
      }
    }
  }

  return (
    <>
    <Navbar />
    <div className='flex items-center justify-center mt-28'>
      <div className='w-96 border rounded bg-white px-7 py-10'>
        <form onSubmit={handleSignUp}>
          <h4 className='text-2xl mb-7'>Sign Up</h4>
          
          <input 
            type="text" 
            placeholder='Name' 
            className='input-box' 
            value={name} 
            onChange={(e) => setName(e.target.value)} autoFocus/>

          <input 
            type="text" 
            placeholder='Email' 
            className='input-box' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} />
          
          <PasswordInput 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          
          {error && <p className='text-red-500 text-sm'>{error}</p>}
          <button type='submit' className='btn-primary'>Sign Up</button>

          <p className='text-sm text-center mt-4'>
            Already have an account?{" "}
            <Link to='/login' className='text-blue-500'>
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
    </>
  )
}

export default SignUp