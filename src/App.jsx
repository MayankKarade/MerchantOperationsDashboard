import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import MerchantsPage from "./pages/MerchantsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/merchants" element={<MerchantsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
