import { render, screen, fireEvent } from '@testing-library/react';
import { PropertyProvider } from '../context/PropertyContext';
import SearchAndFilter from './SearchAndFilter';

const mockSetSearchTerm = jest.fn();
const mockSetPropertyType = jest.fn();

const mockContextValue = {
  setSearchTerm: mockSetSearchTerm,
  setPropertyType: mockSetPropertyType,
  propertyTypes: ['All', 'House', 'Apartment'],
  propertyType: 'All',
};

const renderWithProvider = (ui, { value, ...renderOptions }) => {
  return render(
    <PropertyProvider value={value}>{ui}</PropertyProvider>,
    renderOptions
  );
};

test('renders SearchAndFilter and calls context functions on change', () => {
  renderWithProvider(<SearchAndFilter />, {
    value: mockContextValue,
  });

  const searchInput = screen.getByPlaceholderText(/search by location or description/i);
  fireEvent.change(searchInput, { target: { value: 'test search' } });
  expect(mockSetSearchTerm).toHaveBeenCalledWith('test search');

  const selectElement = screen.getByRole('combobox');
  fireEvent.change(selectElement, { target: { value: 'House' } });
  expect(mockSetPropertyType).toHaveBeenCalledWith('House');
});
