function UserLogout() {
    localStorage.removeItem('user_authenticated');
    window.location.href = '/login';
  
    // No need for a return statement if you're not rendering anything
    return null;
  }
  
  export default UserLogout;