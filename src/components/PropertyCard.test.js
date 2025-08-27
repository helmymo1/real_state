import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PropertyCard from './PropertyCard';

const mockProperty = {
  id: 1,
  location: 'Test Location',
  description: 'Test Description',
  price: 100000,
  image: 'test.jpg',
};

test('renders PropertyCard component with property data', () => {
  render(
    <BrowserRouter>
      <PropertyCard property={mockProperty} />
    </BrowserRouter>
  );

  expect(screen.getByText(mockProperty.location)).toBeInTheDocument();
  expect(screen.getByText(mockProperty.description)).toBeInTheDocument();
  expect(screen.getByText(`$${mockProperty.price}`)).toBeInTheDocument();
  expect(screen.getByAltText(mockProperty.location)).toHaveAttribute('src', mockProperty.image);
  expect(screen.getByRole('link', { name: /view details/i })).toHaveAttribute('href', `/properties/${mockProperty.id}`);
});
