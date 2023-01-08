import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//components
import AddUser from "./components/functionality/AddUser";
import EditUser from "./components/functionality/EditUser";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/add" element={<AddUser/>}></Route>
        <Route path="/edit/:id" element={<EditUser/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
