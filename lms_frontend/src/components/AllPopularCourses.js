import { Link } from "react-router-dom";
import { useState } from "react";

function AllPopularCourses() {
  const coursesPerPage = 3; // Number of courses to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const courses = [
    // Add your actual course data here
    { id: 1, title: "Course Title 1", description: "Course Description 1", image: "/logo512.png", rating: 4.5, views: 1000 },
    { id: 2, title: "Course Title 2", description: "Course Description 2", image: "/logo512.png", rating: 4.2, views: 800 },
    { id: 3, title: "Course Title 3", description: "Course Description 3", image: "/logo512.png", rating: 4.8, views: 1200 },
    { id: 4, title: "Course Title 4", description: "Course Description 4", image: "/logo512.png", rating: 4.6, views: 1100 },
    { id: 5, title: "Course Title 5", description: "Course Description 5", image: "/logo512.png", rating: 4.4, views: 900 },
    { id: 6, title: "Course Title 6", description: "Course Description 6", image: "/logo512.png", rating: 4.7, views: 1300 },
    // Add more courses
  ];

  // Logic to paginate courses
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container my-5">
      <h3>Popular Courses</h3>
      <div className="row">
        {currentCourses.map((course) => (
          <div key={course.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card">
              <Link to={`/detail/${course.id}`}>
                <img src={course.image} className="card-img-top" alt={`${course.title} Thumbnail`} />
              </Link>
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/detail/${course.id}`}>{course.title}</Link>
                </h5>
                <p className="card-text">{course.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="badge bg-primary me-2">Rating: {course.rating}</span>
                    <span className="badge bg-secondary">Views: {course.views}</span>
                  </div>
                  <Link to={`/detail/${course.id}`} className="btn btn-primary">Enroll Now</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <ul className="pagination justify-content-center">
        {Array(Math.ceil(courses.length / coursesPerPage)).fill().map((_, index) => (
          <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
            <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllPopularCourses;
