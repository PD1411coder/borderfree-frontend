import React, {useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from "../context/AuthContext";


const Login = () => {
    const { loginUser } = useContext(AuthContext);
 
  const [credentials,setCredentials] = useState({
    username: "",
    password:"",
  })
  
  const handleInputChange = (e) => {
    const {name,value} = e.target;
    setCredentials({
      ...credentials,
      [name]:value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  

    if (!credentials.username || !credentials.password) {
      alert("Please fill out all fields");
      return;
    }
     loginUser(credentials);

  }

  return (
    <div className="container mt-5" >
    <>
      <h3>Login into Your Account</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group" onSubmit={handleSubmit}>
          <label htmlFor="emailInput" className="form-label mt-4">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput" className="form-label mt-4">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" value="Login" className="btn btn-primary my-3">
          Submit
        </button>
        <p>
          New User? <Link to="/register">Register here!</Link>
        </p>
      </form>
    </>
  </div>
  );
}

export default Login


