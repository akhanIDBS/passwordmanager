import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';

function Home() {
    return (
        <div class="body">
            <div class="access-sidebar">
                <h2>Password Manager</h2>
                <p style={{ fontSize: '12px' }} class="light-text">Welcome to Password Manager! <b>Sign up or Login to continue.</b></p>
                <Form>
                    <Row class="justify-content-center mb-3">
                        <Col>
                            <Form.Label htmlFor="email">
                                Email
                            </Form.Label>
                            <Form.Control
                                className="mb-2"
                                id="email"
                                placeholder="email@example.com"
                            />
                        </Col>
                    </Row>
                    <Row class="justify-content-center">
                        <Col>
                            <Form.Label htmlFor="password">
                                Password
                            </Form.Label>
                            <Form.Control
                                className="mb-2"
                                id="password"
                                type="password"
                            />
                        </Col>
                    </Row>
                    <Row className="w-100 mt-3">
                        <Col>
                            <Link to="/dashboard" style={{ textDecoration: 'none', width: "100%"}} className="d-flex justify-content-center">
                                <Button variant="dark" style={{ width: "75%" }}>Login</Button>
                            </Link>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
}

export default Home;