import React, { useState, useEffect } from 'react';
import TeacherSidebar from './TeacherSidebar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


const EditCourse = ({ match }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    techs: '',
    teacher: '',
    category: '',
    featured_img: null,
  });

  const {course_id} = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/teacher-course-detail/${course_id}`);
        const { title, description, techs, teacher, category, featured_img } = response.data;
        setCourseData({
          title,
          description,
          techs,
          teacher,
          category: category.id, // Assuming you get the category object with an "id" property
          featured_img, // Assuming "featured_img" is the URL of the image
        });
        setSelectedCategory(category.id);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/category/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCourse();
    fetchCategories();
  }, [course_id]);

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
  };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    const newValue = name === 'featured_img' ? files[0] : value;
    setCourseData({
      ...courseData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const categoryId=selectedCategory;
    const formData = new FormData();
    formData.append('category', categoryId);
    formData.append('featured_img', courseData.featured_img);
    Object.entries(courseData).forEach(([key, value]) => {
      if (key !== 'featured_img' && key !== 'category') {
        formData.append(key, value);
      }
    });
    try {
      await axios.put(`http://127.0.0.1:8000/api/teacher-course-detail/${course_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Course updated successfully!',
        customClass: {
          popup: 'swal-popup',
          title: 'swal-title',
          content: 'swal-content',
        },
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: '#fff',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      });      
      console.log('Course updated successfully!');
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <TeacherSidebar />
        </div>
        <div className="col-md-4">
          <h2 className="text-center mb-4">Edit Course</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                value={courseData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                className="form-control"
                value={courseData.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="techs" className="form-label">
                Technologies Used
              </label>
              <input
                type="text"
                name="techs"
                id="techs"
                className="form-control"
                value={courseData.techs}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="teacher" className="form-label">
                Teacher
              </label>
              <input
                type="text"
                name="teacher"
                id="teacher"
                className="form-control"
                value={courseData.teacher}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                name="category"
                id="category"
                className="form-control"
                value={selectedCategory}
                onChange={handleCategoryChange}
                required
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              {courseData.featured_img && (
                <>
                <img src={courseData.featured_img} alt="Existing" style={{ maxWidth: '50%', marginBottom: '10px', borderRadius: '10%'}} />
                <div htmlFor="featured_img" className='form-label'>Previous Featured Image</div>
                </>
              )}
              <input
                type="file"
                name="featured_img"
                id="featured_img"
                className="form-control"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Update Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
