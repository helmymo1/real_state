import React from "react";
import { useParams } from "react-router-dom";
import { useProperties } from "../context/PropertyContext";
import { Container, Row, Col, Image } from "react-bootstrap";
import AnimationTitles from "../components/functions/AnimationTitles";

function PropertyDetailsPage() {
  const { id } = useParams();
  const { properties } = useProperties();
  const property = properties.find((p) => p.id === parseInt(id));

  if (!property) {
    return (
      <div className="property-details-page py-5">
        <Container>
          <p className="text-white">Property not found.</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="property-details-page py-5">
      <Container>
        <AnimationTitles
          className="title mx-auto"
          title={property.location}
        />
        <Row className="mt-4">
          <Col md={8}>
            <Image src={property.image} alt={property.location} fluid rounded />
          </Col>
          <Col md={4}>
            <h3 className="text-white">${property.price}</h3>
            <p className="gray-90 mt-3">{property.description}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PropertyDetailsPage;
