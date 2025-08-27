import { render, screen, fireEvent } from '@testing-library/react';
import ContactPage from './ContactPage';

test('renders ContactPage form and handles submission', () => {
  window.alert = jest.fn();

  render(<ContactPage />);

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const messageInput = screen.getByLabelText(/message/i);
  const sendButton = screen.getByRole('button', { name: /send message/i });

  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
  fireEvent.change(messageInput, { target: { value: 'Test message' } });

  fireEvent.click(sendButton);

  expect(window.alert).toHaveBeenCalledWith('Thank you for your message, John Doe! We will get back to you soon.');
  expect(nameInput.value).toBe('');
  expect(emailInput.value).toBe('');
  expect(messageInput.value).toBe('');

  window.alert.mockClear();
});
