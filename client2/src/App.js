import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';

import DoctorHome from './pages/DoctorHome';
import AmbulanceService from './pages/AmbulanceService';
import ChamberAppointment from './pages/ChamberAppointment';
import BloodRequestForm from './pages/BloodRequestForm';
import BloodRequest from './pages/BloodRequest';
import RequestList from './pages/RequestList';
import ContactUs from './pages/ContactUs';
import FAQ from './pages/FAQ';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />//home pg path set
          <Route path='/login' element={<Login />} />//login page path set
          <Route path='/register' element={<Register />} />//register page path set
          <Route path="/doctorhome" element={<DoctorHome />} />
          <Route path="/ambulanceservice" element={<AmbulanceService />} />
          <Route path="/chamberapp" element={<ChamberAppointment />} />
          <Route path="/reqList" element={<RequestList />} />
          <Route path="/bloodreq" element={<BloodRequest />} />
          <Route path="/bloodreqform" element={<BloodRequestForm />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/faq" element={<FAQ />} />
        
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
