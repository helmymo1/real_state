import React from "react";
import { useProperties } from "../context/PropertyContext";
import { Form, Row, Col } from "react-bootstrap";

function SearchAndFilter() {
  const { setSearchTerm, setPropertyType, propertyTypes, propertyType } =
    useProperties();

  return (
    <div className="search-and-filter my-4">
      <Row>
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Search by location or description..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-black-100 text-white border-secondary"
          />
        </Col>
        <Col md={4}>
          <Form.Select
            onChange={(e) => setPropertyType(e.target.value)}
            value={propertyType}
            className="bg-black-100 text-white border-secondary"
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </div>
  );
}

export default SearchAndFilter;
