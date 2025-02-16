import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';

const baseUrl = 'https://techeduca.pythonanywhere.com/api/';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user_authenticated, setUser_authenticated] = useState(false);

  useEffect(() => {
    document.title = "User Login"
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(baseUrl + 'user-login', { email, password });
      console.log("User login response: ", response.data);
      if (response.data.user_authenticated) {
        setUser_authenticated(true);
        localStorage.setItem('user_authenticated', 'true');
        localStorage.setItem('studentId', response.data.user_id);
        // Redirect to dashboard after successful login
        window.location.href = '/user-dashboard';
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in user: ", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  if (!user_authenticated) {
    return (
      <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden' style={{ backgroundImage: `url('/images/loginsignupbg.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <MDBRow>
          <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
            <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'black' }}>
              User Login <br />
            </h1>
            <p className='px-3' style={{ color: 'black' }}>
              Enter your credentials to login.
            </p>
          </MDBCol>
          <MDBCol md='6' className='position-relative'>
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
            <MDBCard className='my-5 bg-glass'>
              <MDBCardBody className='p-5'>
                <MDBInput wrapperClass='mb-4' label='Email' id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                <MDBBtn className='w-100 mb-4' size='md' onClick={handleLogin}>Login</MDBBtn>
                <div className="text-center">
                  <p>{error}</p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  } else {
    return (
      <div className="container mt-5">
        <h2 className="text-center">You are already logged in!</h2>
        <p className="text-center">Redirecting to dashboard....</p>
      </div>
    );
  }
}

function Register() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    username: "",
    interested_categories: "",
    status: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}student/`, formData);
      console.log("User registered successfully:", response.data);
      setFormData({
        full_name: "",
        email: "",
        password: "",
        username: "",
        interested_categories: "",
        status: "success"
      });
      // Show success message using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Thank you for your registration!',
        showConfirmButton: false,
        timer: 2000
      });
    } catch (error) {
      console.error("Error registering user:", error);
      // Show error message using SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error registering user. Please try again.',
      });
      setFormData({ ...formData, status: "error" });
    }
  };

  useEffect(() => {
    document.title = "Student Register";
  }, []);

  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden' style={{ backgroundImage: `url('/images/loginsignupbg.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'black'}}>
            User Registration <br />
          </h1>
          <p className='px-3' style={{color: 'black'}}>
            Please fill out the form below to register.
          </p>
        </MDBCol>
        <MDBCol md='6' className='position-relative'>
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
              <MDBInput wrapperClass='mb-4' label='Name' id='full_name' type='text' name='full_name' value={formData.full_name} onChange={handleChange} required />
              <MDBInput wrapperClass='mb-4' label='Email' id='email' type='email' name='email' value={formData.email} onChange={handleChange} required />
              <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' name='password' value={formData.password} onChange={handleChange} required />
              <MDBInput wrapperClass='mb-4' label='Username' id='username' type='text' name='username' value={formData.username} onChange={handleChange} required />
              <MDBInput wrapperClass='mb-4' label='Interests' id='interested_categories' type='textarea' rows='3' name='interested_categories' value={formData.interested_categories} onChange={handleChange} />
              <MDBBtn className='w-100 mb-4' size='md' onClick={handleSubmit}>Register</MDBBtn>
            </MDBCardBody>
          </MDBCard>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
);
}

export { Login, Register };

