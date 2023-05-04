import React from "react";
import { useState } from "react";
import Axios from "axios";
import "./CreateAccount.css";
import { NavLink } from "react-router-dom";
import { createAccount } from "../Services/userService";
import { useNavigate } from "react-router-dom";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
  }
  from 'mdb-react-ui-kit';


const CreateAccount = () => {

    // const [account, setAccount] = useState({
    //     email: "",
    //     password: "",
    //     isManager: false,
    // });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [isManager, setIsManager] = useState(false);
    const navigate = useNavigate();
    const url = "http://localhost:4000";

    // function handleChange(e) {
    //     console.log(e.currentTarget.value);
    //     const { name, value } = e.target;
    //     setAccount((prev) => {
    //         return {
    //           ...prev,
    //           [name]: value,
    //         };
    //     })
    // };

    const bool = 0;

    function handleSubmit(e) {
        if (!e.target.checkValidity()) {
            e.target.reportValidity();
            e.target.className += " was-validated";
            e.preventDefault();
            return;
        }

        if (cPassword != password || cPassword === "") {
            console.log(e);
        } else {
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
                  //navigate('/' + email + '/dashboard');
                  //navigate('/login');
                  //bool++;
                //   console.log("bool" + bool);
                //   e.preventDefault();
                })
                .catch((err) => console.log(err));
                if (email != "" && password != "" && cPassword != "") {
                    //navigate('/' + email + '/dashboard');
                    navigate('/login');
                }
        }
        // Axios.post(url + "/createAccount", {
        //     email : email,
        //     password : password,
        //     isManager : isManager,
        //     headers: {
        //         "content-type": "application/json",
        //     },
        //   })
        //     .then(function (response) {
        //       console.log(response);
        //       //navigate('/' + email + '/dashboard');
        //       //navigate('/login');
        //       //bool++;
        //     //   console.log("bool" + bool);
        //     //   e.preventDefault();
        //     })
        //     .catch((err) => console.log(err));
        //     if (email != "" && password != "" && cPassword != "") {
        //         //navigate('/' + email + '/dashboard');
        //         navigate('/login');
        //     }
            //navigate('/login');
            

        //e.preventDefault();
        // setAccount(email, password, isManager);
        // if (cPassword == password) {
        //     createAccount(account)
        //     .then((res) => {
        //         //update the route
        //         console.log(res);
        //         navigate('/' + email + '/dashboard');
        //     })
        //     .catch((err) => console.log(err));
        // }

    };

    function handleToggle() {
        if (isManager == false) {
            setIsManager(true);
        } else {
            setIsManager(false);
        }
    }

    return (
        <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' id="formContainer">
            <div className='mask gradient-custom-3'></div>
            <MDBCard tag="form" id="formCard" className='m-5' style={{maxWidth: '600px'}}>
                <MDBCardBody className='px-5' >
                <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                <MDBInput
                    required
                    title="Must contain between 10 and 26 characters"
                    minLength="10"
                    maxLength="26" 
                    //pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                    value={email} 
                    wrapperClass='mb-4' 
                    label='Email' 
                    size='lg' 
                    id='form2' 
                    labelId='text' 
                    type='email' 
                    onChange={
                        (e) => {
                        setEmail(e.target.value);
                }}/>
                <MDBInput value={password} 
                    required 
                    title="Must contain between 8 and 26 characters" 
                    minLength="8"
                    maxLength="26"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password' onChange={
                        (e) => {
                        setPassword(e.target.value);
                }}/>
                <MDBInput value={cPassword}
                    required 
                    title="Must contain between 8 and 26 characters" 
                    minLength="8"
                    maxLength="26"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    wrapperClass='mb-4' label='Confirm password' size='lg' id='form4' type='password' onChange={
                        (e) => {
                        setCPassword(e.target.value);
                }}/>
                <div className='d-flex flex-row justify-content-center mb-4'>
                    <MDBCheckbox checked={isManager} onChange={handleToggle} name='flexCheck' id='flexCheckDefault' label='Is Manager' />
                </div>
                <MDBBtn onClick={handleSubmit} className='mb-4 w-100 gradient-custom-4' size='lg'>Register</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
};

export default CreateAccount;