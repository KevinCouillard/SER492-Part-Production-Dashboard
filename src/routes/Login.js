import React from "react";
import { useState } from "react";
import Axios from "axios";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const url = "http://localhost:4000";

    const navigate = useNavigate();

    function handleSubmit() {
        Axios.post(url + "/login", {
            email : email,
            password : password,
            headers: {
                "content-type": "application/json",
            },
          })
            .then(function (response) {
              console.log(response);
              navigate('/' + email + '/dashboard');
            })
            .catch((err) => console.log(err));
    };

    return (
        <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' id="formContainer">
            <div className='mask gradient-custom-3'></div>
            <MDBCard id="formCard" className='m-5' style={{maxWidth: '600px'}}>
                <MDBCardBody className='px-5'>
                <h2 className="text-uppercase text-center mb-5">Login</h2>
                <MDBInput value={email} wrapperClass='mb-4' label='Email' size='lg' id='form2' labelId='text' type='email' onChange={ (e) => {
                    setEmail(e.target.value);
                }}/>
                <MDBInput value={password} wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password' onChange={ (e) => {
                    setPassword(e.target.value);
                }}/>
                <MDBBtn onClick={handleSubmit} className='mb-4 w-100 gradient-custom-4' size='lg'>Login</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
};

export default Login;