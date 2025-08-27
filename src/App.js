import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/Navbar";
import Footer from "./pages/Footer";
import { PropertyProvider } from "./context/PropertyContext";

const HomePage = lazy(() => import("./pages/HomePage"));
const PropertiesPage = lazy(() => import("./pages/PropertiesPage"));
const PropertyDetailsPage = lazy(() => import("./pages/PropertyDetailsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

function App() {
  return (
    <PropertyProvider>
      <BrowserRouter>
        <NavBar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/properties/:id" element={<PropertyDetailsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </PropertyProvider>
  );
}

export default App;
