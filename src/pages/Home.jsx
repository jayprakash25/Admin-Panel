import React from "react";
import Navbar from "../components/Navbar";
import DashboardHome from "../components/DashboardHome";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

function Home() {
  return (
    <body className="flex ">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="bg-[#F9F9F9] md:ml-72">
        <Navbar />
        <DashboardHome />
        <Footer />
      </div>
    </body>
  );
}

export default Home;
