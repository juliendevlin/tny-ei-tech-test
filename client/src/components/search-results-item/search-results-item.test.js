import { fireEvent, render, screen } from '@testing-library/react';
import SearchResultsItem from './';

describe('Search Results Item component', () => {
  it('Should render data for the item', () => {
    render(
      <SearchResultsItem
        header="test header"
        leftSubheader="test left"
        rightSubheader="test right"
      />
    );

    const headings = screen.getAllByRole('heading');

    expect(headings[0]).toHaveTextContent('test header');
    expect(headings[1]).toHaveTextContent('test left');
    expect(headings[2]).toHaveTextContent('test right');
  });

  it('Should fire event on click', () => {
    const mockHandler = jest.fn();

    render(
      <SearchResultsItem
        header="test header"
        clickHandler={mockHandler}
      />
    );

    const item = screen.getByText('test header');
    fireEvent.click(item);

    expect(mockHandler).toHaveBeenCalled();
  });
});
