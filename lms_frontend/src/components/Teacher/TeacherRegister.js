import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';

const baseUrl = 'http://127.0.0.1:8000/api/teacher/';

const TeacherRegister = () => {
  const initialState = {
    full_name: "",
    email: "",
    password: "",
    qualification: "",
    mobile_no: "",
    expertise: "",
    status: ""
  };

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [authenticated, setAuthenticated] = useState(false); // Track authentication status

  useEffect(() => {
    document.title = "Teacher Register";
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(baseUrl, formData);
      console.log("Teacher registered successfully:", response.data);
      setSuccess(true);
      setError(null);
      setFormData(initialState);
      setAuthenticated(true);
      localStorage.setItem('teacher_authenticated', 'true');
      window.location.href = '/teacher-dashboard';
    } catch (error) {
      console.error("Error registering teacher:", error);
      setError("An error occurred while registering the teacher. Please try again later.");
      setSuccess(false);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('teacher_authenticated');
    if (isLoggedIn === 'true') {
      setAuthenticated(true);
      window.location.href = '/teacher-dashboard';
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      window.location.href = '/teacher-dashboard';
    }
  }, [authenticated]);

  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden' style={{ backgroundImage: `url('/images/loginsignupbg.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'black'}}>
            Teacher Register <br />
          </h1>
          <p className='px-3' style={{color: 'black'}}>
            Please fill out the form below to register as a teacher.
          </p>
        </MDBCol>
        <MDBCol md='6' className='position-relative'>
          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">Teacher registered successfully!</div>}
              <form onSubmit={handleSubmit}>
                <MDBInput wrapperClass='mb-4' label='Full Name' id='full_name' type='text' name='full_name' value={formData.full_name} onChange={handleChange} required />
                <MDBInput wrapperClass='mb-4' label='Email' id='email' type='email' name='email' value={formData.email} onChange={handleChange} required />
                <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' name='password' value={formData.password} onChange={handleChange} required />
                <MDBInput wrapperClass='mb-4' label='Qualification' id='qualification' type='text' name='qualification' value={formData.qualification} onChange={handleChange} required />
                <MDBInput wrapperClass='mb-4' label='Mobile Number' id='mobile_no' type='text' name='mobile_no' value={formData.mobile_no} onChange={handleChange} required />
                <MDBInput wrapperClass='mb-4' label='Expertise' id='expertise' type='text' name='expertise' value={formData.expertise} onChange={handleChange} required />
                <MDBBtn className='w-100 mb-4' size='md' type='submit'>Register</MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default TeacherRegister;
