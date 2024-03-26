from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from main.serializers import TeacherSerializer, CategorySerializer, CourseSerializer, ChapterSerializer, StudentSerializer, StudentCourseEnrollSerializer, FetchStudentCourseEnrollSerializer, CourseRatingSerializer, AllCourseRatingSerializer
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from . import models
import json

class TeacherList(generics.ListCreateAPIView):
    queryset=models.Teacher.objects.all()
    serializer_class=TeacherSerializer
    # permission_classes=[permissions.IsAuthenticated]

class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Teacher.objects.all()
    serializer_class=TeacherSerializer
    # permission_classes=[permissions.IsAuthenticated]

@csrf_exempt
def teacher_login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')
            print("Email:", email)  # Print email for debugging
            print("Password:", password)  # Print password for debugging
            teacher_data = models.Teacher.objects.get(email=email)
            
            if teacher_data.password == password:
                return JsonResponse({'teacher_authenticated': True, 'teacher_id':teacher_data.id})
            else:
                return JsonResponse({'teacher_authenticated': False, 'message': 'Incorrect password'})
        except models.Teacher.DoesNotExist:
            return JsonResponse({'teacher_authenticated': False, 'message': 'Teacher with this email does not exist'})
        except Exception as e:
            return JsonResponse({'teacher_authenticated': False, 'message': str(e)})
    else:
        return JsonResponse({'error': 'Only POST requests are allowed for teacher login'})
    
    
class CategoryList(generics.ListCreateAPIView):
    queryset=models.CourseCategory.objects.all()
    serializer_class=CategorySerializer
    # permission_classes=[permissions.IsAuthenticated]

class CourseList(generics.ListCreateAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer
    # permission_classes=[permissions.IsAuthenticated]

    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    
    def get_queryset(self):
        qs = super().get_queryset()

        if 'result' in self.request.GET:
            limit = self.request.GET['result']
            qs = model.Course.objects.all().order_by('-id')[:int(limit)]

        if 'category' in self.request.GET:
            category = self.request.GET['category']
            qs = qs.filter(techs__icontains=category)

        if 'skill_name' in self.request.GET and 'teacher' in self.request.GET:
            skill_name=self.request.GET['skill_name']
            teacher=self.request.GET['teacher']
            teacher=models.Teacher.objects.filter(id=teacher).first()
            qs=models.Course.objects.filter(techs__icontains=skill_name,teacher=teacher)

        return qs


class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Course.objects.all()
    serializer_class=CourseSerializer
  
 # specific teacher course   
class TeacherCourseList(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    # permission_classes=[permissions.IsAuthenticated]
    
    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher=models.Teacher.objects.get(pk=teacher_id)
        return models.Course.objects.filter(teacher=teacher)
    
 # specific teacher course   
class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Course.objects.all()
    serializer_class = CourseSerializer
    # permission_classes=[permissions.IsAuthenticated]
        
class ChapterList(generics.ListCreateAPIView):
    queryset=models.Chapter.objects.all()
    serializer_class=ChapterSerializer    
    
class CourseChapterList(generics.ListAPIView):
    serializer_class=ChapterSerializer    
    
    def get_queryset(self):
        course_id=self.kwargs["course_id"]
        course=models.Course.objects.get(pk=course_id)
        return models.Chapter.objects.filter(course=course)
    
class AllCourseChapterList(generics.ListAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer
    
class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Chapter.objects.all()
    serializer_class=ChapterSerializer
    
# STUDENT
class StudentList(generics.ListCreateAPIView):
    queryset=models.Student.objects.all()
    serializer_class=StudentSerializer

@csrf_exempt    
def user_login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')
            print("Email: ", email)
            print("password: ", password)
            user_data = models.Student.objects.get(email=email)
            
            if user_data.password == password:
                return JsonResponse({'user_authenticated': True, 'user_id': user_data.id})
            else:
                return JsonResponse({'user_authenticated': False, 'message': 'Incorrect Password'})
        except models.Student.DoesNotExist:
            return JsonResponse({'user_authenticated': False, 'message': 'User with this email does not exist'})   
        
        
class StudentEnrollCourseList(generics.ListCreateAPIView):
     queryset=models.StudentCourseEnrollment.objects.all()
     serializer_class=StudentCourseEnrollSerializer
     
def fetch_enroll_status(request,student_id,course_id):
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    enrollStatus=models.StudentCourseEnrollment.objects.filter(course=course,student=student).count()
    if enrollStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})
    
def fetch_rating_status(request,student_id,course_id):
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    ratingStatus=models.CourseRating.objects.filter(course=course,student=student).count()
    if ratingStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})
        
class EnrolledStudentList(generics.ListAPIView):
    serializer_class=FetchStudentCourseEnrollSerializer
    
    def get_queryset(self):
        course_id=self.kwargs['course_id']
        course=models.Course.objects.filter(pk=course_id).first()
        return models.StudentCourseEnrollment.objects.filter(course=course).order_by('enrolled_time') 
    
class CourseRatingList(generics.ListCreateAPIView):
    serializer_class=CourseRatingSerializer
    
    def get_queryset(self):
        course_id=self.kwargs['course_id']
        course=models.Course.objects.get(pk=course_id)
        return models.CourseRating.objects.filter(course=course)
    
class AllCourseRatingList(generics.ListAPIView):
    queryset=models.CourseRating.objects.all()
    serializer_class=AllCourseRatingSerializer     