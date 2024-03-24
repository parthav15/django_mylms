// FavoriteCourses.js
import React from "react";

function FavoriteCourses() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Favorite Courses</h2>
      <div className="row">
        {/* Add content for favorite courses */}
        <div className="col-md-6">
          <div className="card shadow mb-4">
            <div className="card-body">
              <h5 className="card-title">Favorite Course 1</h5>
              <p className="card-text">Description of Favorite Course 1.</p>
              <a href="/favorite-course-1" className="btn btn-primary">View Details</a>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow mb-4">
            <div className="card-body">
              <h5 className="card-title">Favorite Course 2</h5>
              <p className="card-text">Description of Favorite Course 2.</p>
              <a href="/favorite-course-2" className="btn btn-primary">View Details</a>
            </div>
          </div>
        </div>
        {/* Add more cards as needed */}
      </div>
    </div>
  );
}

export default FavoriteCourses;
