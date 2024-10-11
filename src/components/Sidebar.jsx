import { Nav } from 'react-bootstrap';
import { FaHome, FaUser, FaCog, FaArrowAltCircleLeft } from 'react-icons/fa'; // Example icons
import "../styles/Sidebar.css"

const Sidebar = ({handleLogout}) => {

  // const handleLogout = () => {
  //   localStorage.removeItem('token');  
  //   window.location.reload();          
  // };

  return (
    <Nav className="sidebar d-flex flex-column justify-content-start p-3 border-right">
      <Nav.Item className="mb-4">
        <Nav.Link href="#home" className="d-flex align-items-center">
          <FaHome className="sidebar-icon" />
          <span className="sidebar-text ms-3">Home</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="mb-4">
        <Nav.Link href="#profile" className="d-flex align-items-center">
          <FaUser className="sidebar-icon" />
          <span className="sidebar-text ms-3">Profile</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="mb-4">
        <Nav.Link href="#settings" className="d-flex align-items-center">
          <FaCog className="sidebar-icon" />
          <span className="sidebar-text ms-3">Settings</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
      <Nav.Link onClick={handleLogout} className="logout d-flex align-items-center">
          <FaArrowAltCircleLeft className="sidebar-icon" />
          <span className="sidebar-text ms-3">Log out</span>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Sidebar;
