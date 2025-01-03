import React from "react";
import Home from "./pages/Home";
import CreateCategory from "./components/Category/CreateCategory";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditCategory from "./components/Category/EditCategory";
import SubcategoriesPage from "./components/SubCategory/SubcategoriesPage";
import CreateSubCategory from "./components/SubCategory/CreateSubCategory";
import EditSubCategory from "./components/SubCategory/EditSubCategory";
import ProductsPage from "./components/Product/ProductsPage";
import CreateProductPage from "./components/Product/CreateProductPage";
import ProductDetailsPage from "./components/Product/ProductDetailsPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateCategory />} />
          <Route path="/edit/:id" element={<EditCategory />} />
          <Route path="/category/:categoryId" element={<SubcategoriesPage />} /> 
          <Route path="/create-subcategory" element={<CreateSubCategory />} />
          <Route path="/edit-subcategory/:id" element={<EditSubCategory />} />
          <Route path="/products/subcategory/:subCategoryId" element={<ProductsPage />} />
          <Route path="/create-product" element={<CreateProductPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/product" element={<ProductsPage />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
