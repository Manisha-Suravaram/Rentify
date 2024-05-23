import './App.css';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';  
import HomeComp from './Components/HomeComp';
import Login from './Components/Login';
import Signup from './Components/Signup';
import AvailableProperties from './Components/AvailableProperties';
import Property from './Components/Property';
import Seller from './Components/Seller';
import Edit from './Components/Edit';
import Create from './Components/Create';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeComp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/properties' element={<AvailableProperties />} />
        <Route path='/property/:id' element={<Property />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/seller' element={<Seller />} />
        <Route path='/create' element={<Create />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
