import React from "react";
import { useAuth } from "../../context/AuthContext";
import Login from "../../components/Auth/Login";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav>
      <a href="/">Home</a>
      {user ? <span>Willkommen, {user.email}</span> : <Login />}
    </nav>
  );
};

export default Navbar;
