import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  useEffect(() => {
    document.title = 'TechEduca';
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  const testimonialImageStyle = {
    width: '300px', // Adjust the width as needed
    height: '300px', // Adjust the height as needed
    objectFit: 'cover', // Maintain aspect ratio and crop excess
    borderRadius: '50%', // Make the images circular
  };

  const [latestCourses, setLatestCourses] = useState([]);

  useEffect(() => {
    const fetchLatestCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/course/');
        setLatestCourses(response.data.slice(0, 3)); // Get the first 3 courses as latest
      } catch (error) {
        console.error('Error fetching latest courses:', error);
      }
    };

    fetchLatestCourses();
  }, []);

  return (
    <div>
      <div className="landing-page" style={{ backgroundImage: `url('/images/21427.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center align-items-center" style={{ height: '100%' }}>
          <div className="col-lg-8 text-center text-black">
            <h5 className="text-primary text-uppercase mb-3">Best Online Courses</h5>
            <h1 className="display-3">The Best Online Learning Platform</h1>
            <p className="fs-5 mb-4 pb-2">Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et diam justo clita et kasd rebum sea sanctus eirmod elitr.</p>
            <Link to="/register" className="btn btn-dark py-md-3 px-md-5">Join Now</Link>
          </div>
        </div>
      </div>
    </div>
      <div className="container my-5">
        <h2 className="mb-4">
          Latest Courses <Link to="/all-courses" className="float-end">See All</Link>
        </h2>
        <div className="row">
          {latestCourses.map(course => (
            <div key={course.id} className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 d-flex flex-column justify-content-between">
                <Link to={`/detail/${course.id}`}>
                  <img
                    src={course.featured_img}
                    className="card-img-top"
                    alt={`${course.title} Thumbnail`}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/detail/${course.id}`}>{course.title}</Link>
                  </h5>
                  <p className="card-text">{course.description}</p>
                </div>
                <div className="card-footer">
                  <Link to={`/detail/${course.id}`} className="btn btn-primary">
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container my-5">
        <h2 className="mb-4">Popular Courses <Link to="/all-popular-courses" className="float-end">See All</Link></h2>
        <div className="row">
          {/* Popular Courses Cards Here */}
          {/* Example Card: */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card">
              <img src="/logo512.png" className="card-img-top" alt="Course Thumbnail" />
              <div className="card-body">
                <h5 className="card-title">Course Title</h5>
                <p className="card-text">Course Description</p>
                <a href="/" className="btn btn-primary">Enroll Now</a>
                <div className="mt-2">
                  <span className="badge bg-primary me-2">Rating: 4.2</span>
                  <span className="badge bg-secondary">Views: 800</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card">
              <img src="/logo512.png" className="card-img-top" alt="Course Thumbnail" />
              <div className="card-body">
                <h5 className="card-title">Course Title</h5>
                <p className="card-text">Course Description</p>
                <a href="/" className="btn btn-primary">Enroll Now</a>
                <div className="mt-2">
                  <span className="badge bg-primary me-2">Rating: 4.2</span>
                  <span className="badge bg-secondary">Views: 800</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card">
              <img src="/logo512.png" className="card-img-top" alt="Course Thumbnail" />
              <div className="card-body">
                <h5 className="card-title">Course Title</h5>
                <p className="card-text">Course Description</p>
                <a href="/" className="btn btn-primary">Enroll Now</a>
                <div className="mt-2">
                  <span className="badge bg-primary me-2">Rating: 4.2</span>
                  <span className="badge bg-secondary">Views: 800</span>
                </div>
              </div>
            </div>
          </div>
          {/* End Example Card */}
        </div>
      </div>

      <div className="container my-5">
        <h2 className="mb-4">Popular Teachers <Link to="/all-popular-teachers" className="float-end">See All</Link></h2>
        <div className="row">
          {/* Popular Teachers Cards Here */}
          {/* Example Card: */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card">
              <img src="/logo512.png" className="card-img-top" alt="Teacher Avatar" />
              <div className="card-body">
                <h5 className="card-title">Teacher Name</h5>
                <p className="card-text">Teacher Description</p>
                <Link to="/teacher-detail/1" className="btn btn-primary">View Profile</Link>
                <div>
                  <span className="badge bg-primary me-2">Rating: 4.7</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card">
              <img src="/logo512.png" className="card-img-top" alt="Teacher Avatar" />
              <div className="card-body">
                <h5 className="card-title">Teacher Name</h5>
                <p className="card-text">Teacher Description</p>
                <Link to="/teacher-detail/2" className="btn btn-primary">View Profile</Link>
                <div>
                  <span className="badge bg-primary me-2">Rating: 4.7</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card">
              <img src="/logo512.png" className="card-img-top" alt="Teacher Avatar" />
              <div className="card-body">
                <h5 className="card-title">Teacher Name</h5>
                <p className="card-text">Teacher Description</p>
                <Link to="/teacher-detail/3" className="btn btn-primary">View Profile</Link>
                <div className="mt-2">
                  <span className="badge bg-primary me-2">Rating: 4.2</span>
                </div>
              </div>
            </div>
          </div>
          {/* End Example Card */}
        </div>
      </div>

      <section className="testimonials py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">What our students are saying</h2>
          <Slider {...settings}>
            <div className="col-md-4 mb-4">
              <div className="testimonial-card card shadow-sm border-0">
                <img src="images/studentboy1.jpg" style={testimonialImageStyle} className="card-img-top rounded-circle mx-auto d-block mt-3" alt="Student 1" />
                <div className="card-body p-4">
                  <p className="card-text mb-0">"TechEduca's courses helped me develop the skills I needed to land my dream job as a web developer. The instructors were knowledgeable and supportive, and the curriculum was well-structured and engaging."</p>
                  <h5 className="card-title mt-3 text-center">John Doe</h5>
                  <small className="text-muted">Web Developer</small>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="testimonial-card card shadow-sm border-0">
                <img src="images/studentgirl.jpg" style={testimonialImageStyle} className="card-img-top rounded-circle mx-auto d-block mt-3" alt="Student 2" />
                <div className="card-body p-4">
                  <p className="card-text mb-0">"I was impressed by the quality of the content and the dedication of the instructors at TechEduca. They made learning fun and interactive, and I feel confident in my abilities to apply what I've learned in my future career."</p>
                  <h5 className="card-title mt-3 text-center">Jane Smith</h5>
                  <small className="text-muted">Data Analyst</small>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="testimonial-card card shadow-sm border-0">
                <img src="images/studentboy2.jpg" style={testimonialImageStyle} className="card-img-top rounded-circle mx-auto d-block mt-3" alt="Student 3" />
                <div className="card-body p-4">
                  <p className="card-text mb-0">"TechEduca provided me with the knowledge and skills I needed to transition into the tech industry. The courses were flexible and fit perfectly into my busy schedule. I highly recommend TechEduca to anyone looking to upskill or start a new career in tech."</p>
                  <h5 className="card-title mt-3 text-center">Michael Lee</h5>
                  <small className="text-muted">Software Engineer</small>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </section>
    </div>
  );
}

export default Home;
