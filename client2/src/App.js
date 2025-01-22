import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Homepage/>} />//home pg path set
      <Route path='/login' element={<Login/>} />//login page path set
      <Route path='/register' element={<Register/>} />//register page path set
     </Routes>
     </BrowserRouter>
    </>
 
  );
}

export default App;
