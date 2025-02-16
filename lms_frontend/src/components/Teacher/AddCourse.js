import React, { useState, useEffect } from 'react';
import TeacherSidebar from './TeacherSidebar';
import axios from 'axios';

const AddCourse = () => {
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://techeduca.pythonanywhere.com/api/category/');
        setCategories(response.data);
        if (response.data.length > 0) {
          setSelectedCategory(response.data[0].id);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

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
    const formData = new FormData();
    formData.append('category', selectedCategory);
    formData.append('featured_img', courseData.featured_img);
    Object.entries(courseData).forEach(([key, value]) => {
      if (key !== 'featured_img' && key !== 'category') {
        formData.append(key, value);
      }
    });
    try {
      await axios.post('https://techeduca.pythonanywhere.com/api/course/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setCourseData({
        ...courseData,
        title: '',
        description: '',
        techs: '',
        teacher: '',
        featured_img: null,
      });
      console.log('Course added successfully!');
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <TeacherSidebar />
        </div>
        <div className="col-md-4">
          <h2 className="text-center mb-4">Add New Course</h2>
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
              <label htmlFor="featured_img" className="form-label">
                Featured Image
              </label>
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
                Add Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
