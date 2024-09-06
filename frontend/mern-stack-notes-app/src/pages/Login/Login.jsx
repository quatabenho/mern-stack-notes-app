import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
const Login = () => {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState(null)

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    setError('');
    // Login API Call
  }

  return <> 
    <Navbar />

    <div className='flex items-center justify-center mt-28'>
      <div className='w-96 border rounded bg-white px-7 py-10'>
        <form onSubmit={handleLogin}>
          <h4 className='text-2xl mb-7'>Login</h4>

          <input type="text" placeholder='Email' className='input-box' 
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          < PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={PasswordInput}
          />

          {error && <p className='text-red-500 text-sm'>{error}</p>}
          <button type='submit' className='btn-primary'>Login</button>

          <p className='text-sm text-center mt-4'>
            Not registered yet?{" "}
            <Link to='/signUp' className='text-blue-500'>
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  </>
}

export default Login