import { render, screen } from '@testing-library/react';
import Subscribe from './Subscribe';

test('renders Subscribe component with input and button', () => {
  render(<Subscribe />);

  expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
});
