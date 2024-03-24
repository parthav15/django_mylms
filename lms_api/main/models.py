from django.db import models
from django.core import serializers

# Teacher model
class Teacher(models.Model):
    id = models.AutoField(primary_key=True)
    full_name = models.CharField(max_length=100)
    description = models.TextField()
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    qualification = models.CharField(max_length=100)
    mobile_no = models.CharField(max_length=20)
    expertise = models.TextField()
    
    class Meta:
        verbose_name_plural="1. Teachers"
        
    def skill_list(self):
        skill_list=self.expertise.split(',')
        return skill_list
    
# CourseCategory model
class CourseCategory(models.Model):
    id = models.AutoField(primary_key=True)
    title=models.CharField(max_length=150)
    description=models.TextField()
    
    class Meta:
        verbose_name_plural="2. Course Categories"
        
    def __str__(self):
        return self.title
    
# Course Model    
class Course(models.Model):
    id = models.AutoField(primary_key=True)
    category=models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    teacher=models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='teacher_courses')
    title=models.CharField(max_length=150)
    description=models.TextField()
    featured_img=models.ImageField(upload_to='media/course_imgs/', null=True)
    techs=models.TextField(null=True)
    
    class Meta:
        verbose_name_plural="3. Courses"
        
    def related_videos(self):
        related_videos=Course.objects.filter(techs__icontains=self.techs)
        return serializers.serialize('json', related_videos)
    
    def tech_list(self):
        tech_list=self.techs.split(',')
        return tech_list
    
    def total_enrolled_students(self):
        total_enrolled_students=StudentCourseEnrollment.objects.filter(course=self).count()
        return total_enrolled_students
    
    def __str__(self):
        return self.title

# Chapter Model    
class Chapter(models.Model):
    id = models.AutoField(primary_key=True)
    course=models.ForeignKey(Course, on_delete=models.CASCADE, related_name='course_chapters')
    title=models.CharField(max_length=150)
    description=models.TextField()
    video=models.FileField(upload_to='media/chapter_videos/', null=True)
    remarks=models.TextField(null=True)
    
    class Meta:
        verbose_name_plural="4. Chapters"
        
# Student model
class Student(models.Model):
    id = models.AutoField(primary_key=True)
    full_name=models.CharField(max_length=100)
    email=models.CharField(max_length=100)
    password=models.CharField(max_length=100)
    username=models.CharField(max_length=100)
    interested_categories=models.TextField()
    
    class Meta:
        verbose_name_plural="5. Students"
        
    def __str__(self):
        return self.full_name

# Student Course Enrollment

class StudentCourseEnrollment(models.Model):
    id = models.AutoField(primary_key=True)
    course=models.ForeignKey(Course,on_delete=models.CASCADE)
    student=models.ForeignKey(Student,on_delete=models.CASCADE)
    enrolled_time=models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural="6. Enrolled Courses"
        
    def __str__(self):
        return f"{self.student} enrolled in {self.course}"
    
# Course Rating and Reviews
class CourseRating(models.Model):
    id=models.AutoField(primary_key=True)
    course=models.ForeignKey(Course,on_delete=models.CASCADE)
    student=models.ForeignKey(Student,on_delete=models.CASCADE)
    rating=models.PositiveIntegerField(default=0)
    reviews=models.TextField(null=True,blank=True)
    review_time=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.course}-{self.student}-{self.rating}"
    