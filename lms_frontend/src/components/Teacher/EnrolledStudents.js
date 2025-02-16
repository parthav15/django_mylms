import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EnrolledStudents = () => {
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const { course_id } = useParams();

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        const response = await axios.get(`https://techeduca.pythonanywhere.com/api/fetch-enrolled-students/${course_id}`);
        setEnrolledStudents(response.data);
      } catch (error) {
        console.error('Error fetching enrolled students:', error);
      }
    };

    fetchEnrolledStudents();
  }, [course_id]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Enrolled Students</h2>
      <div className="table-responsive my-4">
        <table className="table table-bordered table-striped text-center">
          <thead className='thead-dark'>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              {/* Add more fields as needed */}
            </tr>
          </thead>
          <tbody>
            {enrolledStudents.map((row,index) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.student.full_name}</td>
                <td>{row.student.email}</td>
                {/* Add more fields as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrolledStudents;
