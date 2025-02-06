import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Service from "./pages/Service"
import Why_join from "./pages/WhyJoin"
import Trainers_details from "./pages/TrainersDetails"
import Photos from "./pages/Photos"
import Our_blog from "./pages/Blog"
import Wellness from "./pages/Wellness"

import Footer from "./components/Footer";
import "./App.css";


function App() {
  return (
    <Router>
      <div className="page-container">
        <Navbar />
        <main className="content-wrap">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service" element={<Service />} />
            <Route path="/why-join" element={<Why_join />} />
            <Route path="/trainers-details" element={<Trainers_details />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/our-blog" element={<Our_blog />} />
            <Route path="/blog/:id" element={<Our_blog />} />
            <Route path="/wellness" element={<Wellness />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;