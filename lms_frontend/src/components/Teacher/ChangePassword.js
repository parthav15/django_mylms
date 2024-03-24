import React, { useState } from 'react';
import TeacherSidebar from './TeacherSidebar';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate passwords
    if (newPassword !== confirmNewPassword) {
      setError('New password and confirm password must match');
      return;
    }
    // Example logic to update password (API call or other)
    console.log('Changing password...');
    // Clear form fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setError('');
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Section */}
        <div className="col-md-4">
          {/* Include the TeacherSidebar component in the left section */}
          <TeacherSidebar />
        </div>
        {/* Right Section */}
        <div className="col-md-8">
          <h2 className="text-center mb-4">Change Password</h2>
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label htmlFor="currentPassword" className="form-label">Current Password</label>
              <input
                type="password"
                className="form-control"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Change Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
