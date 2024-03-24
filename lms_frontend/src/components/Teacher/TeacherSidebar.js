import React from 'react'
import { Link } from 'react-router-dom'

function TeacherSidebar() {
  return (
    <div>
        <div className="col-md-6">
          <h2 className="text-center mb-4">Teacher Dashboard</h2>
          <div className="card shadow mb-4">
            <div className="card-body">
              <h5 className="card-title">Profile</h5>
              <p className="card-text">View and update your profile information.</p>
              <Link to="/teacher-dashboard/UpdateTeacherProfile" className="btn btn-primary">View Profile</Link>
            </div>
          </div>
          <div className="card shadow mb-4">
            <div className="card-body">
              <h5 className="card-title">My Courses</h5>
              <p className="card-text">View and manage your uploaded courses.</p>
              <Link to="/teacher-dashboard/mycourses" className="btn btn-primary">View My Courses</Link>
            </div>
          </div>
          <div className="card shadow mb-4">
            <div className="card-body">
              <h5 className="card-title">Add Course</h5>
              <p className="card-text">Add a new course into your library.</p>
              <Link to="/teacher-dashboard/addcourse" className="btn btn-primary">Add</Link>
            </div>
          </div>
          <div className="card shadow mb-4">
            <div className="card-body">
              <h5 className="card-title">My Users</h5>
              <p className="card-text">View and manage your students.</p>
              <Link to="/teacher-dashboard/myusers" className="btn btn-primary">View My Users</Link>
            </div>
          </div>
          <div className="card shadow mb-4">
            <div className="card-body">
              <h5 className="card-title">Change Password</h5>
              <p className="card-text">Change your account password.</p>
              <Link to="/teacher-dashboard/changepassword" className="btn btn-primary">Change Password</Link>
            </div>
          </div>
          <div className="card shadow mb-4">
            <div className="card-body">
              <h5 className="card-title">Logout</h5>
              <p className="card-text">Logout from your account.</p>
              <Link to="/teacher-logout" className="btn btn-primary btn-danger">Logout</Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default TeacherSidebar