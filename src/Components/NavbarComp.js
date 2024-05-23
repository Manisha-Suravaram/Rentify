import React from 'react'
import {FiMenu} from 'react-icons/fi'


const NavbarComp = () => {
  
  return (
    <nav className='w-full  py-6 bg-slate-100'>
          <label><a className='text-black text-2xl no-underline lg:text-3xl lg:ms-40 font-bold leading-20 ms-10 ' href='/'>Rentify</a></label>
          <input id='check' type='checkbox' className='check'></input>
          <label htmlFor="check" className='toggle text-black'><FiMenu /></label>
          <ul className='md:flex justify-center md:items-center gap-0'>
            <li className='text-black'><a href='/login'>{localStorage.getItem('userRole') ? 'Logout' : 'Login'}</a></li>
          </ul>
        </nav>
  )
}

export default NavbarComp