import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
    const productId = useParams();
      const navigate = useNavigate();
      const [products, setProducts] = useState([]);


const [prodDetails, setProdDetails] = useState({
  productName: "",
  productPrice: "",
  productType: "",
});

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setProdDetails({
    ...prodDetails,
    [name]: value,
  });
};


useEffect(() => {
  async function fetchData() {
    try {
      const res = await fetch(
        "https://borderfree-be.herokuapp.com/api/products",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

      const result = await res.json();
       if (!result.error) {
         console.log(result.payload);
         

        result.payload.filter((product) => {
          if (product._id === productId.id) {
            setProdDetails(product);
            }
            }
            );
         console.log(products);
       } else {
         console.log(result);
       }
         console.log(products);
        console.log(prodDetails);
      
    } catch (err) {
      console.log(err);
    }
  }
  fetchData();


}, []);

const handleSubmit = async(e) => {
        e.preventDefault();
        const res = await fetch(
          "https://borderfree-be.herokuapp.com/api/products",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({  productId: String(productId.id), ...prodDetails, productPrice: parseInt(prodDetails.productPrice),  }),
          }
        );


        const result = await res.json();
        if (!result.error) {
            alert("Product updated successfully");
            setProdDetails({
                productName: "",
                productPrice:"",
                productType: "",
            });
            navigate("/");
        }
        else {
            alert("Error updating product");
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
          Save Changes
        </button>
      </form>
    </>
  );
}

export default EditProduct