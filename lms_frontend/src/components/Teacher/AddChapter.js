import React, { useState } from 'react';
import TeacherSidebar from './TeacherSidebar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const baseUrl = 'https://techeduca.pythonanywhere.com/api';

const AddChapter = ({ onAdd }) => {

  const {course_id} = useParams();

  
  const [chapterData, setChapterData] = useState({
    course: course_id || '',
    title: '',
    description: '',
    video: null, // Changed from featuredImage to video
    remarks: '', // Changed from technologiesUsed to remarks
    // Add more fields as needed
  });

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
    try{
      const formData = new FormData();
      formData.append('course', chapterData.course);
      formData.append('title', chapterData.title);
      formData.append('description', chapterData.description);
      formData.append('video', chapterData.video);
      formData.append('remarks', chapterData.remarks);

      const response = await axios.post(`${baseUrl}/chapter/`, formData, {
        headers:{
          'Content-Type': 'multipart/form-data',
        },
      })
      if (response.data) {
        // Perform actions after successful chapter addition
        // onAdd(response.data);
  
        // Reset form fields
        setChapterData({
          course: course_id || '',
          title: '',
          description: '',
          video: null,
          remarks: '',
        });
  
        // Redirect to the add chapter page for the same course
        window.location.href = `/teacher-dashboard/addchapter/${chapterData.course}`;
      } else {
        // Handle error if response data is empty
        console.error('Error: Response data is empty');
      }
    } catch (error) {
      console.error('Error in adding Chapter:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          {/* Include the TeacherSidebar component in the left section */}
          <TeacherSidebar />
        </div>
        <div className="col-md-4">
          <h2 className="text-center mb-4">Add New Chapter</h2>
          <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <label htmlFor="name" className="form-label">Course</label>
              <input
                type="text"
                name="course"
                id="course"
                className="form-control"
                value={chapterData.course}
                onChange={handleInputChange}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Chapter Name</label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                value={chapterData.name}
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
              <label htmlFor="video" className="form-label">Video</label>
              <input
                type="file"
                name="video"
                id="video"
                className="form-control"
                // value={chapterData.video}
                onChange={handleFileChange}
                required
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
            {/* Add more form fields for other chapter information */}
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Add Chapter</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddChapter;
