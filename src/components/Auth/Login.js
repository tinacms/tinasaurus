import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase-config";

const Login = () => {
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, "test@example.com", "password123");
      alert("Erfolgreich eingeloggt");
    } catch (error) {
      console.error("Fehler beim Login:", error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login mit E-Mail</button>
    </div>
  );
};

export default Login;
