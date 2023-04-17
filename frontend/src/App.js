import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import CardPage from './pages/CardPage';
import ViewProfilePage from './pages/ViewProfilePage';
import CreateEventPage from './pages/CreateEventPage';
import CreateRSOPage from './pages/CreateRSOPage';
import JoinRSOPage from './pages/JoinRSOPage';
import LandingPage from './pages/LandingPage';
import ViewEventsPage from './pages/ViewEventsPage';
import CreateUniProfilePage from './pages/CreateUniProfilePage';
import SelectRSOPage from './pages/SelectRSOPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/login" index element={<LoginPage />} />
        <Route path="/register" index element={<RegisterPage />} />
        <Route path="/cards" index element={<CardPage />} />
        <Route path="/profile" index element={<ViewProfilePage />} />
        <Route path="/createEvent" index element={<CreateEventPage />} />
        <Route path="/createRSO" index element={<CreateRSOPage />} />
        <Route path="/joinRSO" index element={<JoinRSOPage />} />
        <Route path="/landing" index element={<LandingPage />} />
        <Route path="/viewEvents" index element={<ViewEventsPage />} />
        <Route path="/createUniProfile" index element={<CreateUniProfilePage />} />
        <Route path="/selectRSO" index element={<SelectRSOPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;