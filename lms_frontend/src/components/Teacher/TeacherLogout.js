function TeacherLogout() {
  localStorage.removeItem('teacher_authenticated');
  window.location.href = '/teacher-login';

  // No need for a return statement if you're not rendering anything
  return null;
}

export default TeacherLogout;
