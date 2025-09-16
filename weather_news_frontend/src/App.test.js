import { render, screen } from '@testing-library/react';
import App from './App';

test('renders brand name', () => {
  render(<App />);
  const brand = screen.getByText(/City Weather & News/i);
  expect(brand).toBeInTheDocument();
});

test('renders search bar', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/e\.g\., London, UK/i);
  expect(input).toBeInTheDocument();
});
