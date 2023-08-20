import { render, screen } from '@testing-library/react';
import Error from './';

describe('Error component', () => {
  it('Should render error message', () => {
    render(<Error message="test error" />);
    const errorMessage = screen.getByText('test error')
    expect(errorMessage).toBeInTheDocument();
  });
});
