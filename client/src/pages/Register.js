import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import FixedFooter from '../components/Footer'
import Header from '../components/Header'

const Register = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const navigate = useNavigate()

const handleSubmit = async (e)=>{
  e.preventDefault();
  try {
    const result = await axios.post(`${process.env.REACT_APP_API}/register`, {name,email,password});
    console.log(result)
    if(result.data.success){
      alert('Register successfully')
      navigate('/signin')
    }else{
      alert(result.data.message)
    }
  } catch (error) {
    console.log(error)
  }
}
  return (
  <>
  <Header/>
  <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign Up to your account</h2>
  </div>
  <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">

    <form  onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Full Name</label>
        <div className="mt-2">
          <input onChange={(e=>setName(e.target.value))} id="name" name="name" type="text"  required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
        <div className="mt-2">
          <input onChange={(e)=>setEmail(e.target.value)} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
          <div className="text-sm">
            <Link to="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
          </div>
        </div>
        <div className="mt-2">
          <input onChange={(e)=>setPassword(e.target.value)} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
        </div>
      </div>
      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
      </div>
    </form>

    <p className="mt-4 text-center text-sm/6 text-gray-500">
      Already have account
      <Link to="/signin" className="font-semibold text-indigo-600 hover:text-indigo-500"> please sign in</Link>
    </p>
  </div>
</div>

<FixedFooter/>


  </>
  )
}

export default Register