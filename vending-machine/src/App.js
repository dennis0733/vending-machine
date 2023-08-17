import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigate, Outlet } from 'react-router-dom'
import AdminPanel from "./pages/adminpanel"
import { useState } from 'react';

function App() {
 
  const [admin,setAdmin] = useState(false);  

  const ProtectedRoutes = () => {
    return admin ? <Outlet /> : <Navigate to="/" />;
  };
  
  return (
    
    <div className="App">
      <Router>
    
      {admin? <></>: <Navbar setAdmin={setAdmin}/>}
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          
          <Route element={<ProtectedRoutes/>}>
          <Route exact path='/adminpanel' element={<AdminPanel/>}/>

          </Route>

        </Routes>
      </Router>


    </div>
  );
}

export default App;
