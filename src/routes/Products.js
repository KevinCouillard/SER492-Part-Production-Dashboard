import React from "react";
import { useState } from "react";
import Axios from "axios";

const Products = () => {
  const url = "http://localhost:4000";
  const [product_name, setProduct_Name] = useState("");
  const [family, setFamily] = useState("");
  const [code, setCode] = useState("");
  const [productList, setProductList] = useState([]);

  const addProducts = () => {
    Axios.post(url + "/product", {
      product_name: product_name,
      family: family,
      code: code,
      headers: {
        "content-type": "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const getProducts = () => {
    Axios.get(url + "/product")
      .then((response) => {
        setProductList(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="products">
      <div className="productName">
        <label> Product Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setProduct_Name(event.target.value);
          }}
        />
      </div>

      <div className="productFamily">
        <label> Product Family:</label>
        <input
          type="text"
          onChange={(event) => {
            setFamily(event.target.value);
          }}
        />
      </div>

      <div className="productCode">
        <label> Product Code:</label>
        <input
          type="text"
          onChange={(event) => {
            setCode(event.target.value);
          }}
        />
      </div>

      <button onClick={getProducts}>Get Products</button>
      <button onClick={addProducts}>Add Products</button>

      {productList.map((val, key) => {
        return (
          <div className="product-display">
            <h3>product_name: {val.product_name}</h3>
            <h3>Family: {val.family}</h3>
            <h3>Code: {val.code}</h3>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default Products;
