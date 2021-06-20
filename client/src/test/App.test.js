import { render, screen } from '@testing-library/react';
import Home from '../pages/Home.js';

test('renders Home page', () => {
  render(<Home />);
  const linkElement = screen.getByText("React Calculator");
  expect(linkElement).toBeInTheDocument();
});
