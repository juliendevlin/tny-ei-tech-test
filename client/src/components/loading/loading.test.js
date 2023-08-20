import { render, screen } from '@testing-library/react';
import Loading from './';

describe('Loading component', () => {
  it('Should render error message', () => {
    render(<Loading />);
    const loadingWheel = screen.getByTestId('loading-wheel');
    expect(loadingWheel).toBeInTheDocument();
  });
});
