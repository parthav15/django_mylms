import React, { useState } from 'react';
import TeacherSidebar from './TeacherSidebar';

const MyUsers = () => {
  // Example state for storing student data
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
  ]);

  // Example function to handle deleting a student
  const handleDeleteStudent = (studentId) => {
    // Example logic to delete student from the state
    setStudents(students.filter(student => student.id !== studentId));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Section */}
        <div className="col-md-4">
          {/* Include the TeacherSidebar component in the left section */}
          <TeacherSidebar />
        </div>
        {/* Right Section */}
        <div className="col-md-8">
          <h2 className="text-center mb-4">My Users (Students)</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyUsers;
