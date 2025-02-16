import { Link } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";
import axios from 'axios';

function AllPopularTeachers() {
    const [teacher, setTeacher] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
      document.title = "Popular Teachers";
  
      const baseUrl = 'https://techeduca.pythonanywhere.com/api';
      axios.get(baseUrl + '/teacher/')
        .then((response) => {
          setTeacher(response.data);
        })
        .catch((error) => {
          console.error('Error fetching teachers:', error);
        });
    }, []); 

    console.log(teacher);

    const paginate = useCallback((pageNumber) => setCurrentPage(pageNumber), []);

    const teachersPerPage = 3;

    const teachers = useMemo(() => [
        { id: 1, name: "Teacher Name 1", description: "Teacher Description 1", image: "images/teacher1.jpg", rating: 4.5 },
        { id: 2, name: "Teacher Name 2", description: "Teacher Description 2", image: "images/teacher2.jpg", rating: 4.0 },
        { id: 3, name: "Teacher Name 3", description: "Teacher Description 3", image: "images/teacher3.jpg", rating: 4.2 },
        { id: 4, name: "Teacher Name 4", description: "Teacher Description 4", image: "images/teacher4.jpg", rating: 4.8 },
        { id: 5, name: "Teacher Name 5", description: "Teacher Description 5", image: "images/teacher5.jpg", rating: 4.3 },
        { id: 6, name: "Teacher Name 6", description: "Teacher Description 6", image: "images/teacher6.jpg", rating: 4.7 }
    ], []);

    const indexOfLastTeacher = currentPage * teachersPerPage;
    const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
    const currentTeachers = useMemo(() => teachers.slice(indexOfFirstTeacher, indexOfLastTeacher), [teachers, indexOfFirstTeacher, indexOfLastTeacher]);

    return (
        <div className="container my-5">
            <h3>Popular Teachers</h3>
            <div className="row">
            {currentTeachers.map((teacher) => (
                <div key={teacher.id} className="col-lg-4 col-md-6 mb-4">
                <div className="card">
                    <Link to={`images/teacher-detail/${teacher.id}`}>
                    <img src={teacher.image} className="card-img-top" alt={`${teacher.name} Thumbnail`} />
                    </Link>
                    <div className="card-body">
                    <h5 className="card-title">
                        <Link to={`images/teacher-detail/${teacher.id}`}>{teacher.name}</Link>
                    </h5>
                    <p className="card-text">{teacher.description}</p>
                    <span className="badge bg-primary me-2">Rating: {teacher.rating}</span>
                    <Link to={`/teacher-detail/${teacher.id}`} className="btn btn-primary">View Profile</Link>
                    </div>
                </div>
                </div>
            ))}
            </div>
            <ul className="pagination justify-content-center">
            {Array(Math.ceil(teachers.length / teachersPerPage)).fill().map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
                </li>
            ))}
            </ul>
        </div>
    );
}

export default AllPopularTeachers;
