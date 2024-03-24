import Home from './Home';
import About from './About';
import Header from './Header';
import Footer from './Footer';
import { Routes as Switch, Route } from 'react-router-dom';
import CourseDetail from './CourseDetail';
import TeacherDetail from './TeacherDetail';
import AllCourses from './AllCourses';
import AllPopularCourses from './AllPopularCourses';

// User
import { Login, Register } from './User/LoginSignup';
import FavoriteCourses from './User/FavoriteCourses';
import RecommendedCourses from './User/RecommendedCourses';
import UpdateProfile from './User/Profile';
import Dashboard from './User/Dashboard';

// Teacher
import TeacherLogin from './Teacher/TeacherLogin';
import TeacherRegister from './Teacher/TeacherRegister';
import TeacherLogout from './Teacher/TeacherLogout';
import TeacherDashboard from './Teacher/TeacherDashboard';
import UpdateTeacherProfile from './Teacher/TeacherProfile';
import MyCourses from './Teacher/MyCourses';
import AddCourse from './Teacher/AddCourse';
import EditCourse from './Teacher/EditCourse';
import MyUsers from './Teacher/MyUsers';
import ChangePassword from './Teacher/ChangePassword';
import AllPopularTeachers from './AllPopularTeachers';
import CoursesByCategory from './CoursesByCategory';
import AddChapter from './Teacher/AddChapter';
import CourseChapters from './Teacher/CourseChapters';
import EditChapter from './Teacher/EditChapter';
import TeacherSkillCourses from './TeacherSkillCourses';
import UserLogout from './User/UserLogout';
import EnrolledStudents from './Teacher/EnrolledStudents';


function Main() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/detail/:course_id' element={<CourseDetail />} />
        <Route path='/teacher-detail/:teacher_id' element={<TeacherDetail />} />        
        <Route path='/all-courses' element={<AllCourses />} />   
        <Route path='/all-popular-courses' element={<AllPopularCourses />} />
        <Route path='/all-popular-teachers' element={<AllPopularTeachers />} />
        <Route path='/category/:category_slug' element={<CoursesByCategory />} />
        <Route path='/teacher-skill-courses/:skill_name/:teacher_id' element={<TeacherSkillCourses />} />

        {/* User */}
        <Route path='/login' element={<Login />} /> {/* Add route for Login component */}
        <Route path='/register' element={<Register />} /> {/* Add route for Register component */}
        <Route path='/user-dashboard' element={<Dashboard />} /> {/* Add route for Register component */}
        <Route path='/user-dashboard/favorite' element={<FavoriteCourses />} />
        <Route path='/user-dashboard/recommended' element={<RecommendedCourses />} />
        <Route path='/user-dashboard/UpdateProfile' element={<UpdateProfile />} />
        <Route path='/user-logout' element={<UserLogout />} />

        {/* Teacher */}
        <Route path='/teacher-login' element={<TeacherLogin />} />
        <Route path='/teacher-register' element={<TeacherRegister />} />
        <Route path='/teacher-logout' element={<TeacherLogout />} />        
        <Route path='/teacher-dashboard' element={<TeacherDashboard />} />
        <Route path='/teacher-dashboard/UpdateTeacherProfile' element={<UpdateTeacherProfile />} />
        <Route path='/teacher-dashboard/mycourses' element={<MyCourses />} />
        <Route path='/teacher-dashboard/addcourse' element={<AddCourse />} />
        <Route path='/teacher-dashboard/editcourse/:course_id' element={<EditCourse />} />
        <Route path='/teacher-dashboard/addchapter/:course_id' element={<AddChapter />} />
        <Route path='/teacher-dashboard/myusers' element={<MyUsers />} />
        <Route path='/teacher-dashboard/changepassword' element={<ChangePassword />} />
        <Route path='/teacher-dashboard/coursechapters/:course_id' element={<CourseChapters />} />
        <Route path='/teacher-dashboard/edit-chapter/:course_id/chapter/:chapter_id' element={<EditChapter />} />
        <Route path='/teacher-dashboard/enrolled-students/:course_id' element={<EnrolledStudents />} />
      </Switch>
      <Footer />
    </div>
  );
}

export default Main;
