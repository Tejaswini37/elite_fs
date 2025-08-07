import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MultiStepForm from './components/MultiStepForm';
import AllProfiles from './components/AllProfiles';
import ProfileDetail from './components/ProfileDetail';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MultiStepForm />} />
        <Route path="/profiles" element={<AllProfiles />} />
        <Route path="/profiles/:id" element={<ProfileDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
