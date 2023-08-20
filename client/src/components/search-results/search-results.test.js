import { fireEvent, render, screen } from '@testing-library/react';
import SearchResults from './';

describe('Search Results component', () => {
  it('Should render data for multiple search result items', () => {
    render(
      <SearchResults
        results={[
          {id: 1, header: 'header 1', leftSubheader: 'left subheader 1', rightSubheader: 'right subheader 1'},
          {id: 2, header: 'header 2', leftSubheader: 'left subheader 2', rightSubheader: 'right subheader 2'}
        ]}
      />
    );

    const headings = screen.getAllByRole('heading');

    expect(headings[0]).toHaveTextContent('header 1');
    expect(headings[1]).toHaveTextContent('left subheader 1');
    expect(headings[2]).toHaveTextContent('right subheader 1');
    expect(headings[3]).toHaveTextContent('header 2');
    expect(headings[4]).toHaveTextContent('left subheader 2');
    expect(headings[5]).toHaveTextContent('right subheader 2');
  });

  it('Should fire events for when items are clicked', () => {
    const mockHandler1 = jest.fn();
    const mockHandler2 = jest.fn();

    render(
      <SearchResults
        results={[
          {id: 1, header: 'header 1', clickHandler: mockHandler1},
          {id: 2, header: 'header 2', clickHandler: mockHandler2}
        ]}
      />
    );

    const result1 = screen.getByText('header 1');
    fireEvent.click(result1);

    const result2 = screen.getByText('header 2');
    fireEvent.click(result2);

    expect(mockHandler1).toHaveBeenCalled();
    expect(mockHandler2).toHaveBeenCalled();
  });
});
