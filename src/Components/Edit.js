import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

const PropertyForm = () => {

    const {id} = useParams()
  const [formData, setFormData] = useState({
    owner: '',
    place: '',
    area: '',
    nob: '',
    bathroom: '',
    hospitals: '',
    colleges: '',
    money: '',
    name: ''
  });

  React.useEffect(() => {
    axios.post('http://localhost:8000/getproperty',{id: id})
    .then(res =>{
        delete res.data.property[0]._id
        setFormData(res.data.property[0])
    })
    .catch(err =>{
        console.log(err)
    })
    },[])

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Calling');
    axios.post('http://localhost:8000/editproperty', {id:id,formData: formData})
      .then(response => {
        console.log('Property added:', response.data);
        // Reset form after successful submission
        setFormData({
          owner: '',
          place: '',
          area: '',
          nob: '',
          bathroom: '',
          hospitals: '',
          colleges: '',
          money: '',
          name: ''
        });
        navigate('/seller')
      })
      .catch(error => {
        console.error('There was an error adding the property!', error);
      });
  };

  if(!localStorage.getItem('userRole') || localStorage.getItem('userRole') !== 'seller') navigate('/login')

  return (
    <div className='flex flex-col gap-4 justify-center items-center min-h-screen bg-slate-100'>
      <div className="flex flex-col items-center justify-center bg-indigo-100 w-2/6 h-5/6">
        <form className="w-full rounded-lg">
          <div className="flex font-bold justify-center mt-6">
          </div>
          <h2 className="text-2xl text-center uppercase font-semibold text-gray-900 mb-8">Edit Property</h2>
          <div className="px-12 pb-10">
            {Object.keys(formData).map((key) => (
              <div className="w-full mb-2" key={key}>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="
                      w-full
                      border
                      rounded
                      px-3
                      py-2
                      text-gray-700
                      focus:outline-none
                    "
                  />
                </div>
              </div>
            ))}
            <button
              type="submit"
              onClick={handleSubmit}
              className="
                w-full
                py-2
                mt-8
                rounded-full
                bg-blue-400
                text-gray-100
                focus:outline-none
              "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;
