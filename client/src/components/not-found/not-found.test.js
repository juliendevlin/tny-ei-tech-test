import { render, screen } from '@testing-library/react';
import NotFound from './';

describe('Not Found component', () => {
  it('Should render not found message', () => {
    render(<NotFound />);

    const sadFace = screen.getByText(':(');
    const notFound = screen.getByText('Page Not Found');

    expect(sadFace).toBeInTheDocument();
    expect(notFound).toBeInTheDocument();
  });
});
