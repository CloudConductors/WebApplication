import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


// Pages
import Index from "./pages/index";
import Login  from "./pages/login";
import SignUp from "./pages/signup";
import Schedule from "./pages/schedule";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/Navbar/nav-bar";

// Style
import './assets/Style/styles.css';


function App(){
  return(
    <BrowserRouter>
      <Navbar />
      <div className="App bg-black">
        <div className='content'>
          <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/login' element={<Login />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/Schedule' element={<Schedule />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>   
  )
}

export default App;