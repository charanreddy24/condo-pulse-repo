import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "/src/pages/dashboard/Dashboard.jsx";
import Home from "/src/pages/home/Home.jsx";
import About from "/src/pages/about/About.jsx";
import SignIn from "/src/pages/sign-in/SignIn.jsx";
import SignUp from "/src/pages/sign-up/SignUp.jsx";
import NavbarHeader from "/src/components/NavbarHeader.jsx";
import FooterComponent from "/src/components/FooterComponent.jsx";
import PrivateRoute from "/src/components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <NavbarHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element ={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}
