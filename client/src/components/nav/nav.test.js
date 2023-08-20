import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Nav from './';

// Mock React Router's useNavigate hook
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  return {
    ...(jest.requireActual("react-router-dom")),
    useNavigate: () => mockNavigate,
  }
});

describe('Nav component', () => {
  it('Should render logo', () => {
    render(<Nav />, {wrapper: BrowserRouter});
    
    const logo = screen.getByText('[books]');
    expect(logo).toBeInTheDocument();
  });

  it('Should navigate back to root path when logo is clicked', () => {
    render(<Nav />, {wrapper: BrowserRouter});

    const logo = screen.getByText('[books]');
    fireEvent.click(logo);

    expect(mockNavigate).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
