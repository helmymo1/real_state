import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './Navbar';

test('renders NavBar with correct navigation links', () => {
  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );

  expect(screen.getByRole('link', { name: /properties/i })).toHaveAttribute('href', '/properties');
  expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '/contact');
  expect(screen.getByRole('button', { name: /connect wallet/i })).toBeInTheDocument();
});
