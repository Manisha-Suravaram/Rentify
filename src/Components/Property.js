import React from 'react'
import NavbarComp from './NavbarComp'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Property = () => {

  const {id} = useParams()
  const [data,setData] = React.useState({})
  const [user,setUser] = React.useState({})
  React.useEffect(() => {
    axios.post('http://localhost:8000/getproperty',{id:id,mail:sessionStorage.getItem('userMail')})
    .then(res =>{
      console.log(res.data)
      setData(res.data.property[0])
      setUser(res.data.user)
    })
    .catch(err =>{
      console.log(err)
    })
  },[id])

  const navigate = useNavigate()
  if(!localStorage.getItem('userRole')) navigate('/login')

  return (
    <div className='min-h-screen bg-slate-100 flex flex-col'>
        <NavbarComp />
        <div className='h-full flex flex-col w-full border'>
        <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-1 ">
            <img src={`/property1.jpg`} alt="Main Property" className="w-full h-[400px] object-contain rounded" />
            <p className='text-4xl uppercase font-bold text-center'>{data.name}</p>
          </div>
        </section>
        <section className='flex justify-center gap-48'>
        <section className="mb-8">
          <h3 className="text-4xl font-bold mb-2">Details</h3>
          <ul className="list-disc list-inside font-semibold text-xl text-gray-700">
            <li>Rent: {data.money}</li>
            <li>Location: {data.area} , {data.location}</li>
            <li>Bedrooms: {data.bathroom}</li>
            <li>Bathrooms: {data.bathroom}</li>
            <li>Square Feet: 1,200 sqft</li>
          </ul>
        </section>

        <section className="mb-8 text-4xl font-bold">
          <h3 className="text-4xl font-semibold mb-4">Seller Details</h3>
          <ul className="list-disc list-inside font-semibold text-xl text-gray-700">
            <li>First Name: {user.firstname}</li>
            <li>Last Name: {user.lastname}</li>
            <li>Email ID: {user.email}</li>
            <li>Phone No.: {user.mobile}</li>
          </ul>
        </section>
        </section>
       
      </main>
        </div>
    </div>
  )
}

export default Property