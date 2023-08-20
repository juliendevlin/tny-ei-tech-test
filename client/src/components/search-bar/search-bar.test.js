import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from './';

describe('Search Bar component', () => {
  it('Should render search bar', () => {
    render (<SearchBar />);
    const searchBar = screen.getByRole('searchbox');
    expect(searchBar).toBeInTheDocument();
  });

  it('Should fire handler on change', () => {
    const mockHandler = jest.fn();
    render (<SearchBar searchHandler={mockHandler} />);

    const searchBar = screen.getByRole('searchbox');
    fireEvent.change(searchBar, {target: {value: 'test'}});

    expect(mockHandler).toHaveBeenCalled();
  });
});
