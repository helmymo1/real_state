import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the App component with the Navbar', () => {
  render(<App />);
  const navbarElement = screen.getByRole('navigation');
  expect(navbarElement).toBeInTheDocument();
});
