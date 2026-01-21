import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import JobListings from './pages/JobListings';
import JobDetails from './pages/JobDetails';
import ApplicationForm from './pages/ApplicationForm';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<JobListings />} />
          <Route path="/jobs/:jobId" element={<JobDetails />} />
          <Route path="/apply/:jobId" element={<ApplicationForm />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
