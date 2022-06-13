import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import AllProducts from './AllProducts';
 
const Home = () => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);

  useEffect(()=>{
    !user && navigate('/login', {replace: true});
    
  },);

const onClick = () => {
  navigate("/products");
};

  return (
    <div>
      <button type="button" className="btn btn-info" onClick={onClick}>
        Add Product
      </button>
      <AllProducts />
    </div>
  );
}

export default Home