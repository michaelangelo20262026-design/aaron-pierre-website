import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

function MainLayout({ children }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <main className="min-h-screen bg-[#090909] text-white">
      <Navbar />

      <div key={location.pathname} className="page-enter">
        {children}
      </div>

      <Footer />
    </main>
  );
}

export default MainLayout;
