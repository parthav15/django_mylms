from rest_framework import serializers
from . import models

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Teacher
        fields = ['id','full_name','description','email','password','qualification','mobile_no','expertise','teacher_courses','skill_list']
        
    def __init__(self, *args,**kwargs):
        super(TeacherSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.deph=0
        if request and request.method == 'GET':
            self.Meta.depth=1
        
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Student
        fields=['id','full_name','email','password','username','interested_categories']
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=models.CourseCategory
        fields = '__all__'
        
        
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = ['id', 'category', 'teacher', 'title', 'description', 'featured_img', 'techs', 'course_chapters', 'related_videos','tech_list','total_enrolled_students', 'course_rating']
        
    def __init__(self, *args,**kwargs):
        super(CourseSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.deph=0
        if request and request.method == 'GET':
            self.Meta.depth=1
        
class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Chapter
        fields='__all__'
        
class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.StudentCourseEnrollment
        fields=['id','course','student','enrolled_time']
        
class FetchStudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.StudentCourseEnrollment
        fields=['id','course','student','enrolled_time']
        
    def __init__(self, *args,**kwargs):
        super(FetchStudentCourseEnrollSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.deph=0
        if request and request.method == 'GET':
            self.Meta.depth=1
            
class AllCourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseRating
        fields = ['id', 'course', 'student', 'rating', 'reviews', 'review_time']
        read_only_fields = ['id', 'review_time']
        extra_kwargs = {
            'course': {'required': True},
            'student': {'required': True},
            'rating': {'required': True, 'min_value': 1, 'max_value': 5},
        }
    def __init__(self, *args,**kwargs):
        super(AllCourseRatingSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.deph=0
        if request and request.method == 'GET':
            self.Meta.depth=1    
        
class CourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseRating
        fields = ['id', 'course', 'student', 'rating', 'reviews', 'review_time']
        read_only_fields = ['id', 'review_time']
        extra_kwargs = {
            'course': {'required': True},
            'student': {'required': True},
            'rating': {'required': True, 'min_value': 1, 'max_value': 5},
        }