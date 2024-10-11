import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import "../styles/BlogApp.css";


const BlogApp = () => {
  const [blogs, setBlogs] = useState([
    {
      title: "Welcome to Blog Verse",
      content: "This is your first blog post! Explore, create, and share your thoughts.",
      image: "/assets/card-imgs/image-1.png",
    },
    {
      title: "Another Blog Post",
      content: "This is a sample content for another blog post. Keep writing!",
      image: "/assets/card-imgs/image-2.png",
    },
    {
      title: "Tips for Blogging",
      content: "Learn some tips and tricks to make your blogging experience more enjoyable.",
      image: "/assets/card-imgs/image-3.png",
    },
  ]); // State for blogs
  const [title, setTitle] = useState(''); // State for title input
  const [content, setContent] = useState(''); // State for content input
  const [editingIndex, setEditingIndex] = useState(null); // State for editing index
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [viewingIndex, setViewingIndex] = useState(null); // State for viewing a blog in full

  const images = [
    "/assets/card-imgs/image-1.png",
    "/assets/card-imgs/image-2.png",
    "/assets/card-imgs/image-3.png",
    "/assets/card-imgs/image-4.png",
    "/assets/card-imgs/image-5.png",
    "/assets/card-imgs/image-6.png",
  ];

  // Load blogs from localStorage when the component mounts
  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('blogs'));
    if (savedBlogs && savedBlogs.length > 0) {
      setBlogs(savedBlogs);
    }
  }, []);

  // Save blogs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }, [blogs]);


  // Handle form submission for creating or updating a blog post
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    const randomImage = images[Math.floor(Math.random() * images.length)];
    const newBlog = { title, content, image: randomImage };

    if (editingIndex !== null) {
      // Update existing blog post
      updateBlog(editingIndex, newBlog);
      setEditingIndex(null); // Clear the editing index
    } else {
      // Create a new blog post
      setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
    }

    // Clear form fields
    setTitle('');
    setContent('');
    handleClose(); // Close the modal
  };

  // Function to update a blog post
  const updateBlog = (index, updatedBlog) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = [...prevBlogs];
      updatedBlogs[index] = updatedBlog; // Update specific index
      return updatedBlogs; // Return updated array
    });
  };

  // Open modal for adding a new blog
  const handleAdd = () => {
    setTitle(''); // Clear title input
    setContent(''); // Clear content input
    setEditingIndex(null); // Reset editing index
    setShowModal(true); // Open modal
  };

  // Edit a blog post
  const handleEdit = (index) => {
    setTitle(blogs[index].title); // Set title input with existing title
    setContent(blogs[index].content); // Set content input with existing content
    setEditingIndex(index); // Set the index of the blog being edited
    setShowModal(true); // Open modal for editing
  };

  // Delete a blog post
  const handleDelete = (index) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = prevBlogs.filter((_, i) => i !== index);
      return updatedBlogs; // Return updated array
    });
  };

  // Handle modal close
  const handleClose = () => setShowModal(false);

  // Handle viewing full content
const handleView = (index) => {
  setViewingIndex(index); // Set the index of the blog to view
};

// Handle closing the view
const handleCloseView = () => {
  setViewingIndex(null); // Clear the viewing index
};


  return (
    <div className=" blog-app">
      <div className="title-wrapper" >
        <span className="h3">Blog Verse</span>
        
          {/* Button to trigger add blog modal */}
        <div className='buttons-container'>
        <Button className="add-new-button" variant="primary" onClick={handleAdd}>
          Add New
        </Button>
        <Button variant="outline-light" className="preview-button" >
          Preview
        </Button>
        </div>
      </div>

      {/* List of blogs */}
      <Row className="my-4">
        {blogs.map((blog, index) => (
          <Col
            key={index}
            xs={6}     // 2 columns on mobile
            md={4}     // 3 columns on tablet
            lg={4}
            xl={3}     // 4 columns on large screens
            className="my-2"
          >
            <div className="card each-card shadow-sm p-3 mb-5 bg-body rounded"  style={{}}> {/* Ensure cards take full height */}
            <div className='image-div'><img src={blog.image}  className="card-img-top card-image" alt="img"/></div>
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.content.length > 100 ? `${blog.content.substring(0, 65)}...` : blog.content}</p>
                <div className='button-container'>
                <Button className="btn-sm" variant="light border" onClick={() => handleView(index)}>
                  View
                </Button>{' '}
                <Button className="btn-sm" variant="light border" onClick={() => handleEdit(index)}>
                  Edit
                </Button>{' '}
                <Button className="btn-sm" variant="light border" onClick={() => handleDelete(index)}>
                  Delete
                </Button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Modal for Adding or Editing Blogs */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingIndex !== null ? 'Edit Blog' : 'Add New Blog'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="blogTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="blogContent" className="mt-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter blog content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Form.Group>
            <div className="mt-3">
              <Button className="modal-button" type="submit">
                {editingIndex !== null ? 'Update Blog' : 'Add Blog'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* View Modal for full content */}
      {viewingIndex !== null && (
        <Modal show={viewingIndex !== null} onHide={handleCloseView}>
          <Modal.Header closeButton>
            <Modal.Title>{blogs[viewingIndex].title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{blogs[viewingIndex].content}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseView}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default BlogApp;
