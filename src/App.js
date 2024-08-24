import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Components/signup';
import Login from './Components/login';
import AdminJobsForm from './Components/adminjobsform';
import AdminJobsList from './Components/adminjobslist';
import JobsList from './Components/jobslist';
import Header from './Components/Header';
import "./App.css"

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/jobs" element={<AdminJobsList />} />
        <Route path="/admin/jobs/new" element={<AdminJobsForm />} />
        <Route path="/jobs" element={<JobsList />} />
        <Route path="/" element={<JobsList />}/>
      </Routes>
    </Router>
  );
}

export default App;
