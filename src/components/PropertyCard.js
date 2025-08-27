import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PropertyCard = ({ property }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="h-100"
  >
    <Card className="bg-black-100 rounded h-100">
      <Card.Body className="p-2 d-flex flex-column">
        <div className="rounded overflow-hidden position-relative">
          <Card.Img variant="top" alt={property.location} src={property.image} />
        </div>
        <div className="d-flex flex-column flex-grow-1 mt-2">
          <h5 className="mt-2 text-white fw-normal">{property.location}</h5>
          <p className="gray-90 flex-grow-1">{property.description}</p>
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <div>
              <h6 className="text-white">${property.price}</h6>
            </div>
            <Link to={`/properties/${property.id}`}>
              <Button variant="primary" className="m-0">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </Card.Body>
    </Card>
  </motion.div>
);

export default PropertyCard;
