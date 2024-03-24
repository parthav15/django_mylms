import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';

const TeacherDetail = () => {
    let { teacher_id } = useParams();

    const [teacherData, setTeacherData] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const [skillListData, setskillListData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/teacher/${teacher_id}`);
                setTeacherData(response.data);
                setCourseData(response.data.teacher_courses);
                setskillListData(response.data.skill_list);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [teacher_id]);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title mb-4 text-center">Information of {teacherData.full_name}</h2>
                            <div className="row">
                                {/* Profile Picture Section */}
                                <div className="col-md-4 mb-3 mb-md-0">
                                    <img src="/images/parthav.jpg" alt="Profile" className="img-fluid rounded" style={{ aspectRatio: "9/16" }} />
                                </div>
                                {/* Teacher Details */}
                                <div className="col-md-8">
                                    <div className="mb-3">
                                        <label className="form-label">Name:</label>
                                        <p className="fw-bold">{teacherData.full_name}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email:</label>
                                        <p>{teacherData.email}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Expertise:</label>
                                        {skillListData.map((skill,index) => 
                                            <>
                                                <Link to={`/teacher-skill-courses/${skill.trim()}/${teacherData.id}`} className='badge badge-pill text-dark bg-warning'>{skill.trim()}</Link>&nbsp;
                                            </>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description:</label>
                                        <p>{teacherData.description}</p>
                                    </div>
                                    {/* Course List Table */}
                                    <div className="mb-3">
                                        <h3 className="mb-3">Courses Taught:</h3>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Course Name</th>
                                                    <th>Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {courseData.map((course, index) => (
                                                    <tr key={course.id}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <Link to={`/detail/${course.id}`}>
                                                                {course.title}
                                                            </Link>
                                                        </td>
                                                        <td>{course.description}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDetail;
