import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import Header from './components/Header';
import BlogApp from './components/BlogApp';
import "./styles/general.css"
import Sidebar from './components/Sidebar';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(storedUser); // Set user state if token and user exist
    }
  }, []);

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // localStorage.removeItem('user');
    setUser(null); // Update user state to null
  };

  return (
    <Router>
      <Header user={user} setUser={setUser} handleLogout={handleLogout}/>
      <Sidebar handleLogout={handleLogout} />
      <BlogApp/>
      <Routes>
      </Routes>
    </Router>
  );
}

export default App;
