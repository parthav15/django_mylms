from django.urls import path
from . import views

urlpatterns = [
    # Teacher
    path('teacher/', views.TeacherList.as_view()),
    path('teacher/<int:pk>', views.TeacherDetail.as_view()),
    path('teacher-login', views.teacher_login),
    
    # Category
    path('category/', views.CategoryList.as_view()),
    
    # Course
    path('course/',views.CourseList.as_view(),name='course'),
    
    # Specific Course
    path('course/<int:pk>', views.CourseDetailView.as_view()),
    
    # Chapter
    path('chapter/', views.ChapterList.as_view()),
    
    # Specific Course Chapter
    path('course-chapters/<int:course_id>', views.CourseChapterList.as_view()),
    
    # Specific Chapter
    path('chapter/<int:pk>', views.ChapterDetailView.as_view()),
    
    # All Course Chapters
    path('all-course-chapters/', views.AllCourseChapterList.as_view()),

    
    # Teacher Courses
    path('teacher-courses/<int:teacher_id>',views.TeacherCourseList.as_view()),
    
    # Course Detail
    path('teacher-course-detail/<int:pk>',views.TeacherCourseDetail.as_view()),
    
    # STUDENT
    path("student/",views.StudentList.as_view()),
    path('user-login', views.user_login),
    path('student-enroll-course/', views.StudentEnrollCourseList.as_view()),
    path('fetch-enroll-status/<int:student_id>/<int:course_id>/', views.fetch_enroll_status),
    path('fetch-rating-status/<int:student_id>/<int:course_id>/', views.fetch_rating_status),
    path('fetch-enrolled-students/<int:course_id>', views.EnrolledStudentList.as_view()), 
    path('all-course-rating/', views.AllCourseRatingList.as_view()),
    path('course-rating/<int:course_id>', views.CourseRatingList.as_view()),
 
]
