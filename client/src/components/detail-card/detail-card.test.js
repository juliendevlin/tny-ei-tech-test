import { render, screen } from '@testing-library/react';
import DetailCard from './';

describe('Detail Card component', () => {
  it('Should render details in the correct order and uppercase labels', () => {
    render(
      <DetailCard
        header="test header"
        detailLabels={['test label 1', 'test label 2']}
        detailValues={['test value 1', 'test value 2']}
      />
    );

    const headings = screen.getAllByRole('heading');

    expect(headings[0]).toHaveTextContent('test header');
    expect(headings[1]).toHaveTextContent('TEST LABEL 1');
    expect(headings[2]).toHaveTextContent('test value 1');
    expect(headings[3]).toHaveTextContent('TEST LABEL 2');
    expect(headings[4]).toHaveTextContent('test value 2');
  });
});
