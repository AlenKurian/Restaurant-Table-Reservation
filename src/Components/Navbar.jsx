import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">

      {/* Logo */}
      <div className="text-2xl font-semibold">
        <Link to="/home" className="hover:text-gray-200">DineEase</Link>
      </div>

      {/* Main Links */}
      <div className="space-x-6 hidden md:flex">
        <Link to="/home" className="hover:text-gray-200">Home</Link>
        <Link to="/add-restaurant" className="hover:text-gray-200">Restaurants</Link>
        <Link to="/add-table" className="hover:text-gray-200">Add Table</Link>


        {/* Add Restaurant Page */}
        <Link to="/add-restaurant" className="hover:text-gray-200 font-medium">
          Add Restaurant
        </Link>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="bg-white text-blue-600 px-4 py-1 rounded-md hover:bg-gray-100"
      >
        Logout
      </button>

    </nav>
  );
}

export default Navbar;
