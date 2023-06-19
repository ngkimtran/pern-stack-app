import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Details from "./routes/Details";
import Update from "./routes/Update";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants/:id" element={<Details />} />
          <Route path="/restaurants/:id/update" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
