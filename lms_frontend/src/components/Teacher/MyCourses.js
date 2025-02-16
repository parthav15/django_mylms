import React, { useState, useEffect } from 'react';
import TeacherSidebar from './TeacherSidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';
const baseUrl = 'https://techeduca.pythonanywhere.com/api';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const teacher_id = localStorage.getItem('teacher_id');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${baseUrl}/teacher-courses/`+teacher_id);
        const mappedCourses = response.data.map(course => ({
          id: course.id,
          name: course.title,
          description: course.description,
          image: course.featured_img,
          total_enrolled_students: course.total_enrolled_students,
        }));
        setCourses(mappedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [teacher_id]);

  const deleteCourse = async (id) => {
    try {
      await axios.delete(`${baseUrl}/course/${id}`);
      setCourses(courses.filter(course => course.id !== id));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <TeacherSidebar />
        </div>
        <div className="col-md-8">
          <h2 className="text-center mb-4">My Courses</h2>
          <div className="table-responsive my-4">
            <table className="table table-bordered table-striped text-center">
              <thead className='thead-dark'>
                <tr>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th>Actions</th>
                  <th>Total Enrolled</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id}>
                    <td>{course.id}</td>
                    <td><Link to={`/teacher-dashboard/coursechapters/${course.id}`}>{course.name}</Link></td>
                    <td><img src={course.image} width="80" className='rounded' alt={course.name} /></td>
                    <td>{course.description}</td>
                    <td>
                      <Link to={`/teacher-dashboard/editcourse/${course.id}`} className="btn btn-info btn-primary ms-2">
                        Edit
                      </Link>
                      <Link to={`/teacher-dashboard/addchapter/${course.id}`} className="btn btn-primary ms-2">
                        Add Chapters
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteCourse(course.id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td><Link to={`/teacher-dashboard/enrolled-students/${course.id}`}>{course.total_enrolled_students} Student(s)</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
