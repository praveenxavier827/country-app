import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 symbol.');
      return;
    }
    setError('');
    navigate('/home');
  };

  return (
    <Container fluid className="login-container d-flex align-items-center justify-content-center">
      <Row className="login-row">
        <Col md={6} className="form-col">
          <h2 className="mb-3">Sign In</h2>
          <p>New user? <a href="#">Create an account</a></p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Username or email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            {error && <div className="text-danger mb-2">{error}</div>}
            <Form.Group className="mb-3 custom-check">
              <Form.Check label="Keep me signed in" />
            </Form.Group>
            <Button variant="dark" type="submit" className="w-100">Sign In</Button>
            <div className="social-login mt-3 text-center">
              <span>Or Sign in with</span>
            
            <div className="footer-section text-center">
                <div className="social-icons">
                    <span className="icon"><i className="fab fa-google"></i></span>
                    <span className="icon"><i className="fab fa-facebook-f"></i></span>
                    <span className="icon"><i className="fab fa-linkedin-in"></i></span>
                    <span className="icon"><i className="fab fa-twitter"></i></span>
                </div>
                <p className="email">Example@email.com</p>
                <p className="copyright">Copyright © 2020 Name. All rights reserved.</p>
            </div>

            </div>
          </Form>
        </Col>
        <Col md={6} className="d-none d-md-flex align-items-center justify-content-center illustration-col">
          <img src="/assets/login-img.png" alt="login" className="img-fluid" />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;