import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';

const baseUrl = 'https://techeduca.pythonanywhere.com/api/';

function TeacherLogin() {
  useEffect(() => {
    document.title = "Teacher Login";
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [teacherAuthenticated, setTeacherAuthenticated] = useState(false); // Track authentication status

  // Check localStorage for authentication status on component mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('teacher_authenticated');
    if (isLoggedIn === 'true') {
      setTeacherAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(baseUrl + 'teacher-login', { email, password });
      console.log("Teacher login response:", response.data);
      if (response.data.teacher_authenticated) {
        setTeacherAuthenticated(true); // Set authentication status to true
        localStorage.setItem('teacher_authenticated', 'true'); // Store authentication status in localStorage
        localStorage.setItem('teacher_id', response.data.teacher_id);
        window.location.href = '/teacher-dashboard'; // Redirect to teacher dashboard
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in teacher:", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  // Render login form if not authenticated
  if (!teacherAuthenticated) {
    return (
      <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden' style={{ backgroundImage: `url('/images/loginsignupbg.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <MDBRow>
          <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
            <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'black'}}>
              Teacher Login <br />
            </h1>
            <p className='px-3' style={{color: 'black'}}>
              Enter your credentials to login.
            </p>
          </MDBCol>
          <MDBCol md='6' className='position-relative'>
            <MDBCard className='my-5 bg-glass'>
              <MDBCardBody className='p-5'>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleLogin}>
                  <MDBInput wrapperClass='mb-4' label='Email' id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <MDBBtn className='w-100 mb-4' size='md' type='submit'>Login</MDBBtn>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  } else {
    // Render message if already authenticated
    return (
      <div className="container mt-5">
        <h2 className="text-center">You are already logged in!</h2>
        <p className="text-center">Redirecting to dashboard...</p>
      </div>
    );
  }
}

export default TeacherLogin;
