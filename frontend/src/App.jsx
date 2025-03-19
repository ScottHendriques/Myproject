import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx';
import { Routes, Route, Navigate} from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import { useAuthStore } from './store/useAuthStore.js';
import {Loader} from "lucide-react";
import {Toaster} from "react-hot-toast";
import { useThemeStore } from './store/useThemeStore.js';
import BookingPage from './pages/BookingPage.jsx';
import TrackingPage from './pages/TrackingPage.jsx';
import FlightSchedule from './pages/FlightSchedule.jsx';
import StationCapabilities from './pages/Stationcapabilities.jsx';
import AdminPage from './pages/AdminPage.jsx';
import EmployeeLoginPage from './pages/EmployeeLoginPage.jsx';
import Footer from './components/Footer.jsx';
import AboutUs from './pages/AboutUs.jsx';
import SelectFlight from './pages/SelectFlight.jsx';
import Dashboard from './pages/Dashboard.jsx';


const App = () => {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore();
  const theme = useThemeStore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log({authUser});

  if(isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className="sizw-10 animate-spin"/>
    </div>
  )

  return (
    <div data-theme={theme} className="flex flex-col min-h-screen">
     <Navbar/>
      <main className='flex-grow mt-20'>
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to = "/login"/>}/>
        <Route path='/employee-login' element={<EmployeeLoginPage/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/signup' element={!authUser ? <SignUpPage/> : <Navigate to="/"/>}/>
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to="/"/>}/>
        <Route path='/settings' element={ <SettingsPage/>}/>
        <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}/>
        <Route path='/booking' element={authUser ? <BookingPage/> : <Navigate to='/login'/>}/>
        <Route path='/select' element={authUser ? <SelectFlight/> : <Navigate to='/login'/>}/>
        <Route path='/tracking' element={<TrackingPage/>}/>
        <Route path='/tracking/:flightNumber' element={<TrackingPage/>}/>
        <Route path='/flight-schedule' element={<FlightSchedule/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/Station-Capabilities' element={<StationCapabilities/>}/>
        <Route path='/Aboutus' element={<AboutUs/>}/>
      </Routes>
      </main>
      <Footer/>

      <Toaster/>

      
    </div>
  );
}

export default App;