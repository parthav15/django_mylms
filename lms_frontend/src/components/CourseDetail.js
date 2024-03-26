import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../App.css';
const siteUrl = 'http://127.0.0.1:8000/';
const baseUrl = 'http://127.0.0.1:8000/api/';

function CourseDetail() {
    const [courseData, setCourseData] = useState([]);
    const [chapterData, setChapterData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    const [relatedcourseData, setrelatedcourseData] = useState([]);
    const [techListData, settechListData] = useState([]);
    const { course_id } = useParams();
    const studentId = localStorage.getItem('studentId');
    const [userLoginStatus, setuserLoginStatus] = useState();
    const [enrollStatus, setenrollStatus] = useState();
    const [ratingStatus, setratingStatus] = useState();
    const [rating, setrating] = useState();
    const [ratingFormData, setRatingFormData] = useState({
        rating: '',
        reviews: '',
        course: course_id,
        student: studentId
    });

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const response = await axios.get(`${baseUrl}course/${course_id}`);
                setCourseData(response.data);
                setChapterData(response.data.course_chapters);
                setTeacherData(response.data.teacher);
                setrelatedcourseData(JSON.parse(response.data.related_videos));
                settechListData(response.data.tech_list);

                if(response.data.course_rating !== '' && response.data.course_rating!==null){
                    setrating(response.data.course_rating.rating__avg)
                }
            } catch (error) {
                console.error('Error fetching chapters:', error);
            }

            try {
                const response = await axios.get(`${baseUrl}fetch-enroll-status/${studentId}/${course_id}/`);
                if(response.data.bool===true){
                    setenrollStatus('success');
                }
            } catch (error) {
                console.error(error);
            }

            try {
                const response = await axios.get(`${baseUrl}fetch-rating-status/${studentId}/${course_id}/`);
                if(response.data.bool===true){
                    setratingStatus('success');
                }
            } catch (error) {
                console.error(error);
            }
        };
        const user_authenticated=localStorage.getItem('user_authenticated');
        if(user_authenticated==='true'){
            setuserLoginStatus('success')
        }

        fetchChapters();
    }, [course_id,studentId]);

    const enrollCourse = async () => {
        const formData = new FormData();
        formData.append('course', course_id);
        formData.append('student', studentId);

        try {
            const response = await axios.post(`${baseUrl}student-enroll-course/`, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            // Show success message using SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Enrolled Successfully!',
            });
            console.log(response.data);
            window.location.reload();
        } catch (error) {
            console.log('Error enrolling course:', error);
        }
    };

    const handleRatingFormChange = (e) => {
        setRatingFormData({
            ...ratingFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleRatingFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${baseUrl}course-rating/${course_id}`, ratingFormData);
            console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Rating Submitted Successfully!',
                timer: 5000,
            });
            // Reset form data
            setRatingFormData({
                rating: '',
                review: ''
            });
            window.location.reload();
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
    };
    return (
        <>
            <div className="container my-5">
                <div className="row">
                    <div className="col-lg-6">
                        <img src={courseData.featured_img} alt={courseData.title} className="img-fluid rounded mb-4" />
                    </div>
                    <div className="col-lg-6">
                        <h2 className="mb-4">{courseData.title}</h2>
                        <p className="lead">{courseData.description}</p>
                        <ul className="list-unstyled">
                            <li><strong>Instructor:</strong> <Link to={`/teacher-detail/${teacherData.id}`}>{teacherData.full_name}</Link></li>
                            <li><strong>Duration:</strong> 10 weeks</li>
                            <li><strong>Total Enrolled:</strong> {courseData.total_enrolled_students} Student(s)</li>
                            <li><strong>Techs:</strong> 
                            {techListData.map((tech) => (
                                <Link to={`/category/${tech.trim()}`} className='badge badge-pill text-dark bg-warning'>{tech}</Link>
                            ))}
                            </li>
                            <li><strong>Price:</strong> Rs.500</li>
                            <li>
                                <strong>Rating: {rating}/5
                                { enrollStatus === 'success' && userLoginStatus === 'success' && (
                                    <>
                                    {ratingStatus !== 'success' &&
                                        <button className='btn btn-success btn-sm ms-2' data-bs-toggle='modal' data-bs-target='#ratingModal'>Rating</button>
                                    }
                                    {ratingStatus === 'success' &&
                                    <span style={{color:'green'}}>(You have already rated this course)</span>
                                    }
                                    <div className="modal fade" id="ratingModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-lg">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Rate for {courseData.title}</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <form onSubmit={handleRatingFormSubmit}>
                                                        <div className='mb-3'>
                                                            <label htmlFor="rating" className='form-label'>Rating</label>
                                                            <select className='form-control' name='rating' id='rating' value={ratingFormData.rating} onChange={handleRatingFormChange}>
                                                                <option value='1'>1 - Poor</option>
                                                                <option value='2'>2 - Average</option>
                                                                <option value='3'>3 - Good</option>
                                                                <option value='4'>4 - Very Good</option>
                                                                <option value='5'>5 - Excellent</option>
                                                            </select>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <label htmlFor='reviews' className='form-label'>Review</label>
                                                            <textarea className='form-control' rows='5' id='reviews' name='reviews' value={ratingFormData.reviews} onChange={handleRatingFormChange} placeholder='Write your review'></textarea>
                                                        </div>
                                                        <button type='submit' className='btn btn-primary'>Submit</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                )}
                                </strong>
                            </li>
                        </ul>
                        { enrollStatus === 'success' && userLoginStatus === 'success' &&
                            <p><span>You are already enrolled in this course.</span></p>
                        }
                        { userLoginStatus === 'success' && enrollStatus !== 'success' &&
                            <button onClick={enrollCourse} className="btn btn-primary me-3">Enroll Now</button>
                        }
                        { userLoginStatus !== 'success' &&
                            <Link to="/login"><button className="btn btn-primary me-3">Please Login First</button></Link>
                        }
                        <button className="btn btn-outline-primary">Add to Wishlist</button>
                    </div>
                </div>
            </div>

            {/* Course Content */}
            { enrollStatus === 'success' && userLoginStatus === 'success' &&
            <div className="container my-5">
                <div className="row mt-5">
                    <div className="col-lg-12">
                        <h3>Course Curriculum</h3>
                        <ul className="list-group">
                            {chapterData.map((chapter) => (
                                <li key={chapter.id} className="list-group-item">
                                    {chapter.title}
                                    <Link to={chapter.video} className="btn btn-primary ms-2 bi-youtube">Watch</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            }

            <div className="container my-5">
                <h2 className="mb-4">Related Courses</h2>
                <div className="row">
                    {relatedcourseData.map((rcourse, index) =>
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="card">
                            <Link target='__blank' to={`/detail/${rcourse.pk}`}><img src={`${siteUrl}/${rcourse.fields.featured_img}`} className="card-img-top" alt={rcourse.fields.title} /></Link>
                            <div className="card-body">
                                <h5 className="card-title">{rcourse.fields.title}</h5>
                                <Link to={`/detail/${rcourse.pk}`}><p className="card-text">{rcourse.fields.description}</p></Link>
                                <a href="/" className="btn btn-primary">Enroll Now</a>
                            </div>
                        </div>
                    </div>
                     )}
                </div>
            </div>
        </>
    );
}

export default CourseDetail;
