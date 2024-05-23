import React from 'react'
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';


const Login = () => {
  const [uname,setUname] = React.useState('')
  const [pwd,setPwd] = React.useState('')
  const navigate = useNavigate()
  const login = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8000/login', {uname:uname, pwd:pwd})
    .then(res => {
      console.log(res.data)
      if(res.data.valid){
        localStorage.setItem('userRole', res.data.role);
        localStorage.setItem('userMail', res.data.mail)
        if(res.data.role === 'buyer'){
          navigate('/properties')
        }else{
          navigate('/seller')
        }
      }else{
        alert("Invalid Login Credentials")
        navigate('/')
      }
    })
    .catch(err => {
      console.error('Login error:', err);
      alert('An error occurred during login');
    });
  } 
  return (
    <div className='flex flex-col gap-5 justify-center items-center min-h-screen bg-slate-100'>
        <div class=" flex flex-col items-center justify-center bg-indigo-100 w-2/6 h-5/6">
          <form class="w-full rounded-lg">
            <div class="flex font-bold justify-center mt-6">
            </div>
            <h2 class="text-2xl text-center uppercase font-semibold text-gray-900 mb-8">Login Here</h2>
            <div class="px-12 pb-10">
              <div class="w-full mb-2">
                <div class="flex items-center">
                  <input
                    type="text"
                    placeholder="Email Address"
                    class="
                      w-full
                      border
                      rounded
                      px-3
                      py-2
                      text-gray-700
                      focus:outline-none
                    "
                    onChange={(e) => {setUname(e.target.value)}}
                  />
                </div>
              </div>
              <div class="w-full mb-2">
                <div class="flex items-center">
                  <input
                    type="password"
                    placeholder="Password"
                    class="
                      w-full
                      border
                      rounded
                      px-3
                      py-2
                      text-gray-700
                      focus:outline-none
                    "
                    onChange={(e) => setPwd(e.target.value)}
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
                onClick={(e) => {login(e)}}
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <p className='font-semibold'>I am a New User? Please <a className='text-blue-400 underline' href='/signup'>Signup</a></p>
    </div>
  )
}

export default Login