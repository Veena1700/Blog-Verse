import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ProtectedComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      setShowModal(true); // Show modal if not authenticated
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  const handleClose = () => setShowModal(false);

  return (
    <div>
      {isAuthenticated ? (
        <p>You have access to this protected content.</p>
      ) : (
        <p>Restricted Content</p>
      )}

      {/* Modal for showing error */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>You need to be logged in to access this page.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProtectedComponent;
