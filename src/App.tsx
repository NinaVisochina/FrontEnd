import React from "react";
import Home from "./pages/Home";
import CreateCategory from "./components/Category/CreateCategory";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditCategory from "./components/Category/EditCategory";

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateCategory />} />
          <Route path="/edit/:id" element={<EditCategory />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
