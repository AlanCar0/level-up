import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Products from "./page/Products";
import Contact from "./page/Contact";
import Register from "./page/Register";
import "./css/style.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/register" element={<Register />}/>
         </Routes>
      </div>
    </Router>
  );
}

export default App;