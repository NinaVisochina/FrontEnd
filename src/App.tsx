import React from "react";
import Home from "./pages/Home";
import CreateCategory from "./pages/CreateCategory";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateCategory />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
