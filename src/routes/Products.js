import React from "react";
import { useState } from "react";
import Axios from "axios";
import Form from 'react-bootstrap/Form';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

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
      <h2>Add Products</h2>
    <Form>
    <div>
    <TextField
      id="outlined-basic"
      label="Product Name"
      variant="outlined"
      onChange={(event) => {
        setProduct_Name(event.target.value);
      }}
      margin="dense"
    />
     </div>
    
     <div>
    <TextField
      id="outlined-basic"
      label="Product Family"
      variant="outlined"
      onChange={(event) => {
        setFamily(event.target.value);
      }}
      margin="dense"
    />
     </div>

     <div>
    <TextField
      id="outlined-basic"
      label="Product Code"
      variant="outlined"
      onChange={(event) => {
        setCode(event.target.value);
      }}
      margin="dense"
    />
     </div>

     <div className="addbtn">
          <Button
            onClick={addProducts}
            class="btn btn-outline-success"
            endIcon={<SendIcon />}
          >
            Add Product
          </Button>
        </div>

      {/* <button onClick={getProducts}>Get Products</button> */}

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
      </Form>
    </div>
    
  );
};

export default Products;
