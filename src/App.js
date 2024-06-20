import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home'
import ReamTimeHome from './Components/ReamTimeHome';
import BounceRatePage from './Components/Pages/BounceRatePage';
import Navbar from './Components/Navbar';
import DemographicPage from './Components/Pages/DemographicPage';
import FormSubmissionPage from './Components/Pages/FormSubmissionPage';
import UserPage from './Components/Pages/UserPage';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/realtime" element={<ReamTimeHome/>}/>
          <Route path="/Navbar" element={<Navbar />}/>
          <Route path="/user-page" element={<UserPage/>}/>

          <Route path="/demographic-data" element= {<DemographicPage />} />
          
          <Route path="/bounce-rate" element = {<BounceRatePage />}/>
          <Route path="/form-data" element = {<FormSubmissionPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
