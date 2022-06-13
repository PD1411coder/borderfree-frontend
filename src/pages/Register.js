import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from "../context/AuthContext";

const Register = () => {

    const { signupUser } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !credentials.username ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      alert("Please fill out all fields");
      console.log("lol");
      return;
    }

    if (credentials.password !== credentials.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const userData = { ...credentials, confirmPassword: undefined };
    signupUser(userData);
  };

  return (
    <>
      <h3>Create an account</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label mt-4">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            required
          />
        </div>
        <button type="submit" value="Register" className="btn btn-primary my-3">
          Submit
        </button>
        <p>
          Already have an account? <Link to="/login">Signin here!</Link>
        </p>
      </form>
    </>
  );
}

export default Register


