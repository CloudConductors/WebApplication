
// import React from "react";
// import TestComponent from "./components/TestComponent"; // This is the testComponent

// function App() {
//   return (
//     <div>
//       <h1>Welcome to Train Dashboard</h1>
//       <TestComponent />
//     </div>
//   );
// }

// export default App;



import React from "react";
import Routing from "./route/routing";

function App() {
  return (
    <body>
      <Routing />
      </body>
    
  );
}

export default App;



/*
import React from "react";
// import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestComponent from "./components/testComponent";


// Pages
import Index from "./pages/index";
import Login  from "./pages/login";
import SignUp from "./pages/signup";
import Schedule from "./pages/schedule";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/Navbar/nav-bar";
*/



/*
function App(){
  return(
    <BrowserRouter>
      <div className="App">
        <Navbar />
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
*/

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