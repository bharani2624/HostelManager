import { useState } from 'react';
import './App.css';
import SideBar from './assets/SideBar/SideBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login_Signup from './Login/Login';
import Dashboard from './assets/Dashboard/Dashboard';
import Emerald from './assets/Emerald/Emerald';
import Pearl from './assets/Pearl/Pearl';
import Coral from './assets/Coral/Coral';
import Ruby from './assets/Ruby/Ruby';
import Diamond from './assets/Diamond/Diamond';
function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login_Signup />} />

          <Route path='/Dashboard' element={
            <>
          <SideBar isOpen={isOpen} toggle={toggle} />
          <Dashboard isOpen={isOpen} />
            </>
        } />
        <Route path='/Emerald' element={
            <>
          <SideBar isOpen={isOpen} toggle={toggle} />
          <Emerald isOpen={isOpen} />
            </>
        } />
        <Route path='/Pearl' element={
            <>
          <SideBar isOpen={isOpen} toggle={toggle} />
          <Pearl isOpen={isOpen} />
            </>
        } />
        <Route path='/Coral' element={
          <>
        <SideBar isOpen={isOpen} toggle={toggle} />
        <Coral isOpen={isOpen} />
          </>
      } />
      <Route path='/Ruby' element={
        <>
      <SideBar isOpen={isOpen} toggle={toggle} />
      <Ruby isOpen={isOpen} />
        </>
    } />
    <Route path='/Diamond' element={
            <>
          <SideBar isOpen={isOpen} toggle={toggle} />
          <Diamond isOpen={isOpen} />
            </>
        } />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
