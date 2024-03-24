// RecommendedCourses.js
import React from "react";

function RecommendedCourses() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Recommended Courses</h2>
      <div className="row">
        {/* Add content for recommended courses */}
        <div className="col-md-6">
          <div className="card shadow mb-4">
            <div className="card-body">
              <h5 className="card-title">Recommended Course 1</h5>
              <p className="card-text">Description of Recommended Course 1.</p>
              <a href="/recommended-course-1" className="btn btn-primary">View Details</a>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow mb-4">
            <div className="card-body">
              <h5 className="card-title">Recommended Course 2</h5>
              <p className="card-text">Description of Recommended Course 2.</p>
              <a href="/recommended-course-2" className="btn btn-primary">View Details</a>
            </div>
          </div>
        </div>
        {/* Add more cards as needed */}
      </div>
    </div>
  );
}

export default RecommendedCourses;
