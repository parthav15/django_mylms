import React, { useState, useEffect } from 'react';
import TeacherSidebar from './TeacherSidebar';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function CourseChapters() {
    const [chapters, setChapters] = useState([]);
    const [totalResult, settotalResult] = useState([0]);
    const { course_id } = useParams();

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const response = await axios.get(`${baseUrl}/course-chapters/${course_id}`);
                settotalResult(response.data.length);
                setChapters(response.data);
            } catch (error) {
                console.error('Error fetching chapters:', error);
            }
        };

        fetchChapters();
    }, [course_id]);

    const Swal = require('sweetalert2');
    const handleDeleteClick = (chapter_id) => {
        Swal.fire({
            title: 'Confirm',
            text: "Are you sure you want to delete this chapter?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${baseUrl}/chapter/${chapter_id}`);
                    Swal.fire('Success', 'Data has been deleted.');
                    // Fetch updated chapters after deletion
                    try {
                        const response = await axios.get(`${baseUrl}/course-chapters/${course_id}`);
                        settotalResult(response.data.length);
                        setChapters(response.data);
                    } catch (error) {
                        console.error('Error fetching chapters:', error);
                    }
                } catch (error) {
                    Swal.fire('Error', 'Data has not been deleted!', 'error');
                }
            } else {
                Swal.fire('Cancelled', 'Data has not been deleted.', 'info');
            }
        });
    };    

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <TeacherSidebar />
                </div>
                <div className="col-md-8">
                    <h3>All Chapters ({totalResult}) <Link className='btn btn-success float-end' to={"/teacher-dashboard/addchapter/"+course_id}>Add Chapter</Link></h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Chapter ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Video</th>
                                {/* Add more columns as needed */}
                            </tr>
                        </thead>
                        <tbody>
                            {chapters.map((chapter) => (
                                <tr key={chapter.id}>
                                    <td>{chapter.id}</td>
                                    <td>{chapter.title}</td>
                                    <td>{chapter.description}</td>
                                    <td>
                                        <video width="320" height="240" controls>
                                            <source src={chapter.video} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </td>
                                    <td>
                                    <Link to={`/teacher-dashboard/edit-chapter/${course_id}/chapter/${chapter.id}`} className='btn btn-primary'>
                                        <i>&#9998;</i>
                                    </Link>
                                    <button onClick={()=>handleDeleteClick(chapter.id)} className='btn btn-danger ms-2'>
                                        <i>&#128465;</i>
                                    </button>                                   
                                    </td>
                                    {/* Add more columns as needed */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CourseChapters;
