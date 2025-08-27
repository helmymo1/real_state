import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { PropertyProvider } from '../context/PropertyContext';
import PropertiesPage from './PropertiesPage';
import PropertyDetailsPage from './PropertyDetailsPage';

const mockProperties = [
  { id: 1, location: 'Location 1', description: 'Description 1', price: 100, image: 'img1.jpg' },
  { id: 2, location: 'Location 2', description: 'Description 2', price: 200, image: 'img2.jpg' },
];

const mockContextValue = {
  properties: mockProperties,
  propertyTypes: ['All', 'House', 'Apartment'],
  propertyType: 'All',
  setSearchTerm: jest.fn(),
  setPropertyType: jest.fn(),
};

const renderWithProviders = ({ route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <PropertyProvider value={mockContextValue}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:id" element={<PropertyDetailsPage />} />
        </Routes>
      </MemoryRouter>
    </PropertyProvider>
  );
};

test('renders properties on the PropertiesPage', () => {
  renderWithProviders({ route: '/properties' });

  expect(screen.getByText('Location 1')).toBeInTheDocument();
  expect(screen.getByText('Location 2')).toBeInTheDocument();
});

test('allows user to search and filter properties', () => {
  renderWithProviders({ route: '/properties' });

  const searchInput = screen.getByPlaceholderText(/search by location or description/i);
  fireEvent.change(searchInput, { target: { value: 'Location 1' } });
  expect(mockContextValue.setSearchTerm).toHaveBeenCalledWith('Location 1');

  const filterSelect = screen.getByRole('combobox');
  fireEvent.change(filterSelect, { target: { value: 'House' } });
  expect(mockContextValue.setPropertyType).toHaveBeenCalledWith('House');
});

test('navigates to property details page on card click', () => {
  renderWithProviders({ route: '/properties' });

  const viewDetailsLinks = screen.getAllByRole('link', { name: /view details/i });
  fireEvent.click(viewDetailsLinks[0]);

  expect(screen.getByText('Location 1')).toBeInTheDocument();
  expect(screen.getByText('$100')).toBeInTheDocument();
});
