import React from 'react';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/PropertyCard';
import { Container, Row, Col } from 'react-bootstrap';
import AnimationTitles from '../components/functions/AnimationTitles';
import SearchAndFilter from '../components/SearchAndFilter';

function PropertiesPage() {
  const { properties } = useProperties();

  return (
    <div className="properties-page py-5">
      <Container>
        <AnimationTitles
          className="title mx-auto"
          title="All Properties"
        />
        <SearchAndFilter />
        <Row xs={1} md={2} lg={3} className="g-4 mt-4">
          {properties.length > 0 ? (
            properties.map((property) => (
              <Col key={property.id}>
                <PropertyCard property={property} />
              </Col>
            ))
          ) : (
            <Col>
              <p className="text-white">No properties found.</p>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default PropertiesPage;
