import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '/src/pages/dashboard/Dashboard.jsx';
import Home from '/src/pages/home/Home.jsx';
import About from '/src/pages/about/About.jsx';
import SignIn from '/src/pages/sign-in/SignIn.jsx';
import SignUp from '/src/pages/sign-up/SignUp.jsx';
import NavbarHeader from '/src/components/NavbarHeader.jsx';
import FooterComponent from '/src/components/FooterComponent.jsx';
import PrivateRoute from '/src/components/PrivateRoute.jsx';
import LandingPage from './pages/landingPage/LandingPage.jsx';
import { useSelector } from 'react-redux';

export default function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <NavbarHeader />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route
          path="/sign-in"
          element={currentUser ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/sign-up"
          element={currentUser ? <Navigate to="/" /> : <SignUp />}
        />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}
