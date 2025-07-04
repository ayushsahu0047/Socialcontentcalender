import { render, screen } from '@testing-library/react';
import App from './App';

test('renders social media content calendar header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Social Media Content Calendar/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders page and category selection section', () => {
  render(<App />);
  const categorySection = screen.getByText(/Page & Category Selection/i);
  expect(categorySection).toBeInTheDocument();
});

test('renders date selection section', () => {
  render(<App />);
  const dateSection = screen.getByText(/Date Selection/i);
  expect(dateSection).toBeInTheDocument();
});

test('renders content calendar section', () => {
  render(<App />);
  const calendarSection = screen.getByText(/Content Calendar/i);
  expect(calendarSection).toBeInTheDocument();
}); 