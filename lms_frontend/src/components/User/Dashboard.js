import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Section */}
        <div className="col-md-6">
          <h2 className="text-center mb-4">User Dashboard</h2>
          <div className="card shadow mb-4">
            <div className="card-body">
              <h5 className="card-title">Profile</h5>
              <p className="card-text">View and update your profile information.</p>
              <Link to="/user-dashboard/UpdateProfile" className="btn btn-primary">View Profile</Link>
            </div>
          </div>
          <div className="card shadow mb-4">
            <div className="card-body">
              <h5 className="card-title">Enrolled Courses</h5>
              <p className="card-text">View and manage your enrolled courses.</p>
              <Link to="/user-dashboard" className="btn btn-primary">View Enrolled Courses</Link>
            </div>
          </div>
          <div className="card shadow mb-4">
            <div className="card-body">
              <h5 className="card-title">Favorite Courses</h5>
              <p className="card-text">View and manage your favorite courses.</p>
              <Link to="/user-dashboard/favorite" className="btn btn-primary">View Favorite Courses</Link>
            </div>
          </div>
          <div className="card shadow mb-4">
            <div className="card-body">
              <h5 className="card-title">Recommended Courses</h5>
              <p className="card-text">Discover courses recommended for you.</p>
              <a href="/user-dashboard/recommended" className="btn btn-primary">Browse Recommended Courses</a>
            </div>
          </div>
          <div className="card shadow mb-4">
            <div className="card-body">
              <h5 className="card-title">Change Password</h5>
              <p className="card-text">Change your account password.</p>
              <a href="/change-password" className="btn btn-primary">Change Password</a>
            </div>
          </div>
          <div className="card shadow mb-4">
            <div className="card-body">
              <h5 className="card-title">Logout</h5>
              <p className="card-text">Logout from your account.</p>
              <a href="/logout" className="btn btn-primary btn-danger">Logout</a>
            </div>
          </div>
        </div>
        {/* Right Section - Enrolled Courses Table */}
        <div className="col-md-6">
          <h3>Enrolled Courses</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Instructor</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {/* Add rows for enrolled courses */}
              <tr>
                <td>1</td>
                <td>Course Name 1</td>
                <td>Instructor 1</td>
                <td>10 weeks</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Course Name 2</td>
                <td>Instructor 2</td>
                <td>8 weeks</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
