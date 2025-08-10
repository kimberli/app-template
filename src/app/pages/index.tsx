import Footer from "@app/components/Landing/Footer";
import LandingPage from "@app/components/Landing/LandingPage";
import Navbar from "@app/components/ui/Navbar";
import React from "react";

const MainPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <LandingPage />
      <Footer />
    </div>
  );
};

export default MainPage;
