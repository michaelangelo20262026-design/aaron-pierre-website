import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import MainLayout from "./layouts/MainLayout.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Career from "./pages/Career.jsx";
import Gallery from "./pages/Gallery.jsx";
import FanCommunity from "./pages/FanCommunity.jsx";
import FanChat from "./pages/FanChat.jsx";
import ManagementChat from "./pages/ManagementChat.jsx";
import Contact from "./pages/Contact.jsx";
import FanRegister from "./pages/FanRegister.jsx";
import FanLogin from "./pages/FanLogin.jsx";
import FanProfile from "./pages/FanProfile.jsx";

import AdminLogin from "./admin/AdminLogin.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin dashboard */}
        <Route
          path="/admin"
          element={
            localStorage.getItem("adminToken") ? (
              <AdminDashboard />
            ) : (
              <AdminLogin />
            )
          }
        />

        {/* Public website routes */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />

        <Route
          path="/career"
          element={
            <MainLayout>
              <Career />
            </MainLayout>
          }
        />

        <Route
          path="/gallery"
          element={
            <MainLayout>
              <Gallery />
            </MainLayout>
          }
        />

        <Route
          path="/fan-community"
          element={
            <MainLayout>
              <FanCommunity />
            </MainLayout>
          }
        />

        <Route
          path="/fan-chat"
          element={
            <MainLayout>
              <FanChat />
            </MainLayout>
          }
        />

        <Route
          path="/management"
          element={
            <MainLayout>
              <ManagementChat />
            </MainLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />

        <Route
          path="/fan-register"
          element={
            <MainLayout>
              <FanRegister />
            </MainLayout>
          }
        />

        <Route
          path="/fan-login"
          element={
            <MainLayout>
              <FanLogin />
            </MainLayout>
          }
        />
        <Route
          path="/fan-profile"
          element={
            <MainLayout>
              <FanProfile />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
