import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Memory from "./pages/Memory";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memory" element={<Memory />} />
      </Routes>
    </Router>
  );
};

export default App;
