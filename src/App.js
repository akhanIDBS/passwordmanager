import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Button, Form, Row, Col } from 'react-bootstrap';
import Dashboard from './Dashboard';
import Home from './Home';
import React from 'react';


function App() {
  return (
      
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    
  );
}

export default App;
