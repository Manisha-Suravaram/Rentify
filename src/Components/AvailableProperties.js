import React from 'react'
import NavbarComp from './NavbarComp'
import axios from 'axios'
import { MDBDataTable } from 'mdbreact';
import { Navigate, useNavigate } from 'react-router-dom';
import { FcLike } from "react-icons/fc";


const AvailableProperties = () => {

    const [properties,setProperties] = React.useState([])
    const [tabledata, setTabledata] = React.useState({
      columns: [
        {
          label: 'Owner',
          field: 'owner',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Place',
          field: 'place',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Area',
          field: 'area',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Number of Bedrooms',
          field: 'nob',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Bathrooms',
          field: 'bathroom',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Hospitals Nearby',
          field: 'hospitals',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Colleges Nearby',
          field: 'colleges',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Price',
          field: 'money',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Property Name',
          field: 'name',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Likes',
          field: 'likes',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Like It',
          field: 'like',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Action',
          field: 'action',
          sort: 'asc',
          width: 200
        },
      ],
      rows: []
    });
    
    const navigate = useNavigate()

    React.useEffect(() => {
      if (!localStorage.getItem('userRole') || localStorage.getItem('userRole') !== 'buyer') {
          navigate('/login');
      }
  }, [navigate]);

  const likeit = (id) => {
    axios.post('http://localhost:8000/like',{id: id,mail:localStorage.getItem('userMail')})
    .then(res =>{
      setProperties(res.data)
            let rows = []
            res.data.map((property,index) =>{
              rows.push({
                owner: property.owner,
                place: property.place,
                area: property.area,
                nob: property.nob,
                bathroom: property.bathroom,
                hospitals: property.hospitals,
                colleges: property.colleges,
                money: property.money,
                name: property.name,
                likes:property?.likes,
                like: <button className='text-2xl p-2 text-white rounded' onClick={() => likeit(property._id)}><FcLike /></button>,
                action:<button className='bg-blue-500 p-2 text-white rounded-sm' onClick={() => navigate('/property/'+property._id)}>I am Interested</button>
              })
            })
            setTabledata({...tabledata,rows: rows})
    })
    .catch(err =>{
      console.log(err)
    })
  }


  React.useEffect(() =>{
    axios.post('http://localhost:8000/properties',{})
    .then(res =>{
        setProperties(res.data)
        let rows = []
        res.data.map((property,index) =>{
          rows.push({
            owner: property.owner,
            place: property.place,
            area: property.area,
            nob: property.nob,
            bathroom: property.bathroom,
            hospitals: property.hospitals,
            colleges: property.colleges,
            money: property.money,
            name: property.name,
            likes:property?.likes,
            like: <button className='text-2xl p-2 text-white rounded' onClick={() => likeit(property._id)}><FcLike /></button>,
            action:<button className='bg-blue-500 p-2 text-white rounded-sm' onClick={() => navigate('/property/'+property._id)}>I am Interested</button>
          })
        })
        setTabledata({...tabledata,rows: rows})
    })
},[])

  
    
   

  return (
    <div className='min-h-screen flex flex-col bg-slate-100'>
        <NavbarComp />
        <div className='h-full flex flex-col w-full border'>
          <Table data={tabledata} />
        </div>
    </div>
  )
}

export default AvailableProperties


const Table = ({data}) => {
  return (
      <div className='md:p-12 p-3 gap-x-20 gap-y-10  flex flex-wrap justify-center'>
          <div className='md:w-[97%] font-semibold'>
              <MDBDataTable
                  hover
                  striped
                  entriesOptions={[10, 25, 50, 100]}
                  entries={25}
                  bordered

                  className='cursor-pointer text-black uppercase font-semibold'
                  paging={true}
                  data={data}
              ></MDBDataTable>
          </div>
      </div>
  )

}