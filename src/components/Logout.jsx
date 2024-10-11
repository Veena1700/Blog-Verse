const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    
    // Optional: Clear user credentials stored in state if applicable
    // setUser(null); // If you're managing user state in your app
    
    // Optionally redirect to the login page or refresh the app
    window.location.reload();  // Refresh the page to update UI
  };
export default handleLogout; 