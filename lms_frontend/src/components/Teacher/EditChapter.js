import React, { useState, useEffect } from 'react';
import TeacherSidebar from './TeacherSidebar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

const EditChapter = () => {
    
  const [chapterData, setChapterData] = useState({
    course: '',
    title: '',
    description: '',
    video: null,
    existingVideo: '', // New field to hold the URL of existing video
    remarks: '',
    // Add more fields as needed
  });

  const { course_id, chapter_id } = useParams();
  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await axios.get(`${baseUrl}/course-chapters/${course_id}`);
        const chapter = response.data[0];
        setChapterData({
          course: chapter.course,
          title: chapter.title,
          description: chapter.description,
          remarks: chapter.remarks,
          existingVideo: chapter.video, // Set the existing video URL
        });
      } catch (error) {
        console.error('Error fetching chapter:', error);
      }
    };

    fetchChapter();
  }, [course_id]);

  const handleInputChange = (event) => {
    setChapterData({
      ...chapterData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setChapterData({
      ...chapterData,
      video: event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('course', chapterData.course);
      formData.append('title', chapterData.title);
      formData.append('description', chapterData.description);
      formData.append('video', chapterData.video);
      formData.append('remarks', chapterData.remarks);

      await axios.put(`${baseUrl}/chapter/${chapter_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        title: "Success!",
        text: "Chapter has been updated.",
        icon: 'success',
      }).then(() => {
        window.location.href = `/teacher-dashboard/coursechapters/${course_id}`;
      });
    } catch (error) {
      console.error('Error in editing chapter:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <TeacherSidebar />
        </div>
        <div className="col-md-4">
          <h2 className="text-center mb-4">Edit Chapter</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="course" className="form-label">Course</label>
              <input
                type="text"
                name="course"
                id="course"
                className="form-control"
                value={chapterData.course}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Chapter Name</label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                value={chapterData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                name="description"
                id="description"
                className="form-control"
                value={chapterData.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="existingVideo" className="form-label">Existing Video</label>
                {chapterData.existingVideo && (         
                    <video width="320" height="240" controls>
                        <source src={chapterData.existingVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}
            </div>
            <div className="mb-3">
              <label htmlFor="video" className="form-label">New Video</label>
              <input
                type="file"
                name="video"
                id="video"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="remarks" className="form-label">Remarks</label>
              <input
                type="text"
                name="remarks"
                id="remarks"
                className="form-control"
                value={chapterData.remarks}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditChapter;
