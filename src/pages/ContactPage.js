import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import AnimationTitles from "../components/functions/AnimationTitles";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Thank you for your message, ${formData.name}! We will get back to you soon.`
    );
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page py-5">
      <Container>
        <AnimationTitles className="title mx-auto" title="Contact Us" />
        <Row className="justify-content-center mt-4">
          <Col md={8}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-black-100 text-white border-secondary"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-black-100 text-white border-secondary"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="bg-black-100 text-white border-secondary"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Send Message
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContactPage;
