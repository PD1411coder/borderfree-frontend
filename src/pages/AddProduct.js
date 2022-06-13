import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const AddProduct = () => {
    const [prodDetails, setProdDetails] = useState({
        productName: "",
        productPrice: "",
        productType: "",
    });


    const navigate = useNavigate();
    const {user} = useContext(AuthContext);


    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setProdDetails({
            ...prodDetails,
            [name]:value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();


        const res = await fetch(
          "https://borderfree-be.herokuapp.com/api/products",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ ...prodDetails, productPrice: parseInt(prodDetails.productPrice) }),
          }
        );

        const result = await res.json();
        console.log(result);

        if (!result.error) {
            alert("Product added successfully");
            setProdDetails({
                productName: "",
                productPrice:"",
                productType: "",
            });
            navigate("/");
        }else{
            alert("Error adding product");
            console.log(result);
        }
    
    
    }



  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName" className="form-label mt-4">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="productName"
            name="productName"
            value={prodDetails.productName}
            onChange={handleInputChange}
            placeholder="Product Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productPrice" className="form-label mt-4">
            Product Price
          </label>
          <input
            type="number"
            className="form-control"
            id="productPrice"
            name="productPrice"
            value={prodDetails.productPrice}
            onChange={handleInputChange}
            placeholder="Product Price"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productType" className="form-label mt-4">
            Product Type
          </label>
          <input
            type="text"
            className="form-control"
            id="productType"
            name="productType"
            value={prodDetails.productType}
            onChange={handleInputChange}
            placeholder="Product Type"
            required
          />
        </div>
        <button type="submit" className="btn btn-info my-3">
          Add Product
        </button>
      </form>
    </>
  );
}

export default AddProduct

