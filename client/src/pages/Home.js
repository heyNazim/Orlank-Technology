import React from 'react'
import Header from '../components/Header'
import FixedFooter from '../components/Footer'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <Header/>
    <h1 className='text-center mt-5'>Home page</h1>
    <section>
  <div className="mainhomebox">
    <div className="leftbox text-center">
       <h1>User Login</h1> <br /><br /> <br />
       <Link to='/signin'>
       <button type="submit" className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login As User</button>
       </Link>


    </div>
  </div>
    </section>
    <FixedFooter/>
    </>
  )
}

export default Home