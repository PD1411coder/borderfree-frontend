import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();
  const {user, setUser} = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5 sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Product Manager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    All Products
                  </Link>
                </li>
                <li
                  className="nav-item"
                  onClick={() => {
                    setUser(false);
                    localStorage.clear();
                    navigate("/login");
                  }}
                >
                  <button className="btn btn-danger">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar