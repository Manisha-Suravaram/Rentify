import axios from 'axios'
import React from 'react'
import { useNavigate,useLocation } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate()
  const [fname,setFname] = React.useState('')
  const [lname,setLname] = React.useState('')
  const [email,setEmail] = React.useState('')
  const [phone,setPhone] = React.useState('')
  const [pwd,setPwd] = React.useState('')
  const [cfpwd,setCfpwd] = React.useState('')
  const [role,setRole] = React.useState('')


  const Signup = (e) => {
    e.preventDefault();
    if(pwd == cfpwd){
      axios.post('http://localhost:8000/signup',{fname:fname, lname:lname,email:email,phone:phone,pwd:pwd,role:role})
      .then(res => {
        console.log(res.data)
        if(res.data.valid){
          navigate('/login')
        }else{
          navigate('/')
        }
      })
    }
    else{
      alert("Your password doesnot match with confirm Password field")
    }
  }
  return (
    <div className='flex flex-col gap-4 justify-center items-center min-h-screen bg-slate-100'>
        <div class=" flex flex-col items-center justify-center bg-indigo-100 w-2/6 h-5/6">
          <form class="w-full rounded-lg" onSubmit={Signup}>
            <div class="flex font-bold justify-center mt-6">
            </div>
            <h2 class="text-2xl text-center uppercase font-semibold text-gray-900 mb-8">SignUp Here</h2>
            <div class="px-12 pb-10">
              <div class="w-full mb-2">
                <div class="flex items-center">
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    class="
                      w-full
                      border
                      rounded
                      px-3
                      py-2
                      text-gray-700
                      focus:outline-none
                    "
                    onChange={(e) => {setFname(e.target.value)}}

                  />
                </div>
              </div>
              <div class="w-full mb-2">
                <div class="flex items-center">
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    class="
                      w-full
                      border
                      rounded
                      px-3
                      py-2
                      text-gray-700
                      focus:outline-none
                    "
                    onChange={(e) => {setLname(e.target.value)}}

                  />
                </div>
              </div>
              <div class="w-full mb-2">
                <div class="flex items-center">
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    class="
                      w-full
                      border
                      rounded
                      px-3
                      py-2
                      text-gray-700
                      focus:outline-none
                    "
                    onChange={(e) => {setEmail(e.target.value)}}

                  />
                </div>
              </div>
              <div class="w-full mb-2">
                <div class="flex items-center">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    required
                    class="
                      w-full
                      border
                      rounded
                      px-3
                      py-2
                      text-gray-700
                      focus:outline-none
                    "
                    onChange={(e) => {setPhone(e.target.value)}}

                  />
                </div>
              </div>
              <div class="w-full mb-2">
                <div class="flex items-center">
                <select required class="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none" onChange = {(e) => {setRole(e.target.value)}}>
                <option value={'NA'}>Select one option</option>
                  <option value={'seller'}>Seller</option>
                  <option value={'buyer'}>Buyer</option>
                </select> 
                </div>
              </div>
              <div class="w-full mb-2">
                <div class="flex items-center">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    class="
                      w-full
                      border
                      rounded
                      px-3
                      py-2
                      text-gray-700
                      focus:outline-none
                    "
                    onChange={(e) => {setPwd(e.target.value)}}

                  />
                </div>
              </div>
              <div class="w-full mb-2">
                <div class="flex items-center">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    class="
                      w-full
                      border
                      rounded
                      px-3
                      py-2
                      text-gray-700
                      focus:outline-none
                    "
                    onChange={(e) => {setCfpwd(e.target.value)}}
                  />
                </div>
              </div>
              <button
                type="submit"
                class="
                  w-full
                  py-2
                  mt-8
                  rounded-full
                  bg-blue-400
                  text-gray-100
                  focus:outline-none
                "
              >
                SignUp
              </button>
            </div>
          </form>
        </div>
        <p className='font-semibold'>Already Have an account? Please <a className='text-blue-400 underline' href='/login'>Login</a></p>
    </div>
  )
}

export default Login
