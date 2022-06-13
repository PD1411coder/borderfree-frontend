import React from "react";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const AllProducts = () => {
    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [modalData, setModalData] = useState({});
    const navigate = useNavigate();



    useEffect(() => {

        async function fetchData(){
        try{
            const res = await fetch("https://borderfree-be.herokuapp.com/api/products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const result = await res.json();
            if (!result.error) {
                setProducts(result.payload);
                 console.log(products);
            }else{
                console.log(result);
            }
        }catch(err){
            console.log(err);
        
        }
    } fetchData();
    }, []);


    const deleteProduct = async (productId) => {
      if (window.confirm("Are you sure you want to delete this product?")) {

      console.log(productId);
      const getRes = await fetch(
        "https://borderfree-be.herokuapp.com/api/products",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },

          body: JSON.stringify({ productId }),
        }
      );

    
      const response = await getRes.json();
      
      if(!response.error){

        setProducts(response.payload);
        console.log(products);
        navigate("/products");
      }else{
        console.log(response);
      }
    };

  }
 
        
  return (
    <>
      <div>
        <h1 className="my-3">Your Products</h1>
        <hr className="my-2" />
        <>
          {products == null ? (
            <h3>No Products Available</h3>
          ) : (
            <table className="table table-hover">
              <thead>
                <tr className="table-info">
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Type</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    
                    key={product._id}
                    onClick={() => {
                      setModalData({});
                      setModalData(product);
                      setShowModal(true);
                    }}
                  >
                    <td>{product.productName}</td>
                    <td>{product.productPrice}</td>
                    <td>{product.productType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.productName}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            <strong>Price:</strong>
            {modalData.productPrice}
          </p>
          <p>
            <strong>Type:</strong>
            {modalData.productType}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/editproduct/${modalData._id}`}>
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => deleteProduct(modalData._id)}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllProducts;
