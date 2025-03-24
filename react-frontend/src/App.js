import React from "react";
// import Navbar from "./components/Navbar";
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


// Old App
// import logo from './logo.svg';
// import './App.css';
// import Button from 'react-bootstrap/Button';
// import "bootstrap/dist/css/bootstrap.min.css";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <Button> Testing Bootstrap button </Button>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }