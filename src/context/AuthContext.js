import React, { useRef, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [error, setError] = useState(null);

  //login req
  const loginUser = async (userData) => {
    try {
      const res = await fetch(`https://borderfree-be.herokuapp.com/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });

      const result = await res.json();
      if (!result.error) {
        if (!result.success){
          setError(result.payload);
          alert(result.payload);
        }else{
        console.log(result);
        localStorage.setItem("token", result.token);
        setUser(true);
        console.log(user);
        navigate("/");}
      } else {
        setError(result.payload);
        alert(error);
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  //signup req
  const signupUser = async (userData) => {
    try {
      const res = await fetch(
        `https://borderfree-be.herokuapp.com/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...userData }),
        }
      );

      const result = await res.json();
      if (!result.error) {
        if (!result.success){
          setError(result.payload);
          alert(result.payload);
        }else{
        console.log(result);
        navigate("/", { replace: true });}
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ loginUser, signupUser, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
