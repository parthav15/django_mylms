import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function AllCourses() {
  const coursesPerPage = 3; // Number of courses to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/course/");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Logic to paginate courses
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container my-5">
      <h3>All Courses</h3>
      <div className="row">
            {currentCourses.map((course) => (
            <div key={course.id} className="col-lg-4 col-md-6 mb-4">
                <div className="card">
                    <Link to={`/detail/${course.id}`}>
                        <img src={course.featured_img} className="card-img-top" alt={`${course.title} Thumbnail`} />
                    </Link>
                    <div className="card-body">
                        <h5 className="card-title">
                        <Link to={`/detail/${course.id}`}>{course.title}</Link>
                        </h5>
                        <p className="card-text">{course.description}</p>
                        <Link to={`/detail/${course.id}`} className="btn btn-primary">Enroll Now</Link>
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

export default AllCourses;
