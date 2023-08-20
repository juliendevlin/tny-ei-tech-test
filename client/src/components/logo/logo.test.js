import { fireEvent, render, screen } from '@testing-library/react';
import Logo from './';

describe('Logo component', () => {
  it('Should render [books] as text content', () => {
    render(<Logo />);
    const logo = screen.getByText('[books]');
    expect(logo).toBeInTheDocument();
  });

  it('Should have an on click event handler', () => {
    const mockHandler = jest.fn();
    render(<Logo clickHandler={mockHandler} />);

    const logo = screen.getByText('[books]');
    fireEvent.click(logo);

    expect(mockHandler).toHaveBeenCalled();
  });
});
