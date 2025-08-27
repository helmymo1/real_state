import React, { useState, useContext, useEffect } from "react";
import propertiesData from "../data/properties";

const PropertyContext = React.createContext();

export const useProperties = () => {
  return useContext(PropertyContext);
};

export const PropertyProvider = ({ children, value }) => {
  const [properties] = useState(propertiesData);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("All");

  useEffect(() => {
    const filterProperties = () => {
      let tempProperties = [...properties];

      // Filter by search term
      if (searchTerm) {
        tempProperties = tempProperties.filter(
          (property) =>
            property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filter by property type
      if (propertyType !== "All") {
        tempProperties = tempProperties.filter(
          (property) => property.type === propertyType
        );
      }

      setFilteredProperties(tempProperties);
    };

    filterProperties();
  }, [searchTerm, propertyType, properties]);

  // Get unique property types for the filter dropdown
  const propertyTypes = [
    "All",
    ...new Set(properties.map((p) => p.type)),
  ];

  const contextValue = {
    properties: filteredProperties,
    setSearchTerm,
    setPropertyType,
    propertyTypes,
    propertyType,
  };

  return (
    <PropertyContext.Provider value={value || contextValue}>
      {children}
    </PropertyContext.Provider>
  );
};
