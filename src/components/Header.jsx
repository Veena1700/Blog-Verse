import { Navbar, Nav, Dropdown, Form, FormControl, Image, InputGroup, Button, Modal } from 'react-bootstrap';
import "../styles/Header.css"
import { FaSearch, FaAngleLeft } from 'react-icons/fa';
import Login from './Login';
import Register from './Register';
import { useState, useEffect } from 'react';

const Header = ({user, setUser, handleLogout}) => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // Toggle between login and register
  // const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogoutLocal = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null); // Clear user state
    handleLogout(); // Call the logout function passed from the parent
  };

  return (
    <>
    <Navbar bg="white" fixed='top' className="header-navbar px-4 py-2 border-bottom">
      {/* Left - Logo */}
      <FaAngleLeft className='arrow-right' style={{ color: '#6C5DD3' }}/>
      <Navbar.Brand href="#">
        <img
          src="./assets/icon1.png" // Path to logo image
          height="40"
          className="logo d-inline-block align-top"
          alt="Logo"
        />
        <img
          src="./assets/icon-text.png" // Path to logo image
          height="50"
          className="logo-text d-inline-block align-top"
          alt="Logo-text"
        />

      </Navbar.Brand>

      {/* Middle - Afterglow Dropdown and Scenario */}
      <Nav className="dropdowns me-auto mx-4">
        <Dropdown className="ps-3 pe-3">
          <Dropdown.Toggle variant="light" id="dropdown-basic" className="dropdown-items text-dark">
            Afterglow
          </Dropdown.Toggle>
        </Dropdown>

        <div className="d-flex align-items-center ms-4">
          <span className="text-muted">Scenario</span>
          <Dropdown className="ms-2">
            <Dropdown.Toggle variant="light" id="dropdown-basic" className="dropdown-items text-muted ">
              Default
            </Dropdown.Toggle>
          </Dropdown>
        </div>
      </Nav>

      {/* Right - Search and Profile */}
      <Nav className="search-profile-wrapper d-flex align-items-center">
        {/* Search Bar */}
        <div className="search-container me-2">
          <InputGroup>
            <FormControl
              placeholder="Search...."
              aria-label="Search"
              aria-describedby="basic-addon2"
              className="search-input"
            />
            <InputGroup.Text id="basic-addon2" className="search-icon">
              <FaSearch style={{ color: 'gray' }}/>
            </InputGroup.Text>
          </InputGroup>
        </div>

        <div className="d-flex align-items-center">
        {user ? ( // Show username if logged in
              <>
                <Image
                  src="./assets/profile-picture.png"
                  roundedCircle
                  height="40"
                  width="40"
                  className="me-2"
                /> 
                <div className="profile-details">
                  <h6 className="mb-0">{user.username}</h6> {/* Display username here */}
                </div>
              </>
            ) : ( // Show login button if not logged in
              <Button className='register-login-buttons' onClick={() => setShowModal(true)}>
                Register
              </Button>
            )}
            </div>
      </Nav>
    </Navbar>

    {/* Modal for Login/Register */}
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isLogin ? 'Login' : 'Register'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {isLogin ? (
            <Login setUser={setUser} setShowModal={setShowModal} />
          ) : (
            <Register setUser={setUser} setShowModal={setShowModal} />
          )}
          <div className="mt-3 text-center">
            {isLogin ? (
              <p>
                Not a user?{' '}
                <Button className='register-login-buttons' onClick={() => setIsLogin(false)}>
                  Register here
                </Button>
              </p>
            ) : (
              <p>
                Already registered?{' '}
                <Button className='register-login-buttons' onClick={() => setIsLogin(true)}>
                  Login here
                </Button>
              </p>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;