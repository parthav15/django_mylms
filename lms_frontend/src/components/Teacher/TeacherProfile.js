import React, { useState } from 'react';
import TeacherSidebar from './TeacherSidebar';

const UpdateTeacherProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    photo: '', // Add profile photo field
    expertise: '', // Change interests to expertise
    // Add other profile fields here
  });

  const handleInputChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handlePhotoChange = (event) => {
    // Handle file upload for profile photo
    const file = event.target.files[0];
    // Example: Convert file to base64 and store it in state
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData({
        ...userData,
        photo: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Update user data using your logic (e.g., API call, local storage)
    console.log('Profile update:', userData);

    // Handle successful update or errors based on your implementation
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          {/* Include the TeacherSidebar component in the left section */}
          <TeacherSidebar />
        </div>
        <div className="col-md-6">
          {/* Right section - Profile update form */}
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow p-4">
                <h2 className="text-center mb-4">Update Profile</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      value={userData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      value={userData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="photo" className="form-label">Profile Photo</label>
                    <input
                      type="file"
                      name="photo"
                      id="photo"
                      className="form-control"
                      onChange={handlePhotoChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="expertise" className="form-label">Expertise</label>
                    <input
                      type="text"
                      name="expertise"
                      id="expertise"
                      className="form-control"
                      value={userData.expertise}
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* Add form fields for other profile information */}
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">Update Profile</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTeacherProfile;
