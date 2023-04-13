import React from "react";
import { useState } from "react";
import Axios from "axios";
import "./CreateAccount.css";
import { NavLink } from "react-router-dom";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';


const CreateAccount = () => {

    const [account, setAccount] = useState({
        email: "",
        password: "",
        isManager: false,
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [isManager, setIsManager] = useState(false);
    const url = "http://localhost:4000";

    function handleChange(e) {
        console.log(e.currentTarget.value);
        const { name, value } = e.target;
        setAccount((prev) => {
            return {
              ...prev,
              [name]: value,
            };
        })
    };

    function handleSubmit() {
        Axios.post(url + "/createAccount", {
            email : email,
            password : password,
            isManager : isManager,
            headers: {
                "content-type": "application/json",
            },
          })
            .then(function (response) {
              console.log(response);
            })
            .catch((err) => console.log(err));
    };

    return (
        <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' id="formContainer">
            <div className='mask gradient-custom-3'></div>
            <MDBCard id="formCard" className='m-5' style={{maxWidth: '600px'}}>
                <MDBCardBody className='px-5'>
                <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                <MDBInput value={email} wrapperClass='mb-4' label='Email' size='lg' id='form2' labelId='text' type='email' onChange={ (e) => {
                    setEmail(e.target.value);
                }}/>
                <MDBInput value={password} wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password' onChange={ (e) => {
                    setPassword(e.target.value);
                }}/>
                <MDBInput value={cPassword} wrapperClass='mb-4' label='Confirm password' size='lg' id='form4' type='password' onChange={ (e) => {
                    setCPassword(e.target.value);
                }}/>
                <div className='d-flex flex-row justify-content-center mb-4'>
                    <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='Is Manager' />
                </div>
                <MDBBtn onClick={handleSubmit} className='mb-4 w-100 gradient-custom-4' size='lg'>Register</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
};

export default CreateAccount;