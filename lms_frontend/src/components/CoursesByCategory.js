import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';

function CoursesByCategory() {
  const coursesPerPage = 3; // Number of courses to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [courseData, setCourseData] = useState([]);
  const { category_slug } = useParams();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${baseUrl}/course/?category=${category_slug}`);
        setCourseData(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [category_slug]);

  // Function to paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get the courses for the current page
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courseData.slice(indexOfFirstCourse, indexOfLastCourse);

  return (
    <div className="container my-5">
      <h3>{category_slug}</h3>
      <div className="row">
        {currentCourses.map((course) => (
          <div key={course.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card">
              <Link to={`/detail/${course.id}`}>
                <img src={course.featured_img} className="card-img-top" alt={course.title} />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <Link to={`/category/${course.id}`} className="btn btn-primary">Enroll Now</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button onClick={() => paginate(currentPage - 1)} className="page-link">Previous</button>
        </li>
        <li className={`page-item ${currentPage === Math.ceil(courseData.length / coursesPerPage) ? 'disabled' : ''}`}>
          <button onClick={() => paginate(currentPage + 1)} className="page-link">Next</button>
        </li>
      </ul>
    </div>
  );
}

export default CoursesByCategory;
