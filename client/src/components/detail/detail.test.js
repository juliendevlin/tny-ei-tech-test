import { screen, render } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Detail from './';

describe('Detail component', () => {
  it('Should render the container', () => {
    render(
      <MemoryRouter initialEntries={['/books/test']}>
        <Detail />
      </MemoryRouter>
    );

    const container = screen.getByTestId('detail');
    expect(container).toBeInTheDocument();
  });

  it('Should display the loading wheel when loading', () => {
    render(
      <MemoryRouter initialEntries={['/books/test']}>
        <Detail />
      </MemoryRouter>
    );

    const loadingWheel = screen.getByTestId('loading-wheel');
    expect(loadingWheel).toBeInTheDocument();
  });

  it('Should display an error message if there is API error', async () => {
    const server = setupServer(
      rest.get('http://localhost:3001/books/test', (req, res, ctx) => {
        return res(ctx.status(400));
      }),
    )
    
    server.listen()

    render(
      <MemoryRouter initialEntries={['/books/test']}>
        <Routes>
          <Route path='/books/:isbn' element={<Detail />} /> 
        </Routes>
      </MemoryRouter>
    );

    const error = await screen.findByText(/Failed to load book/);
    expect(error).toBeInTheDocument();

    server.close();
  });

  it('Should display API detail card information when API response is successful', async () => {
    const server = setupServer(
      rest.get('http://localhost:3001/books/test', (req, res, ctx) => {
        return res(ctx.json({
          author: 'test author',
          publisher: 'test publisher',
          city: 'test city',
          format: 'test format',
          year: 'test year', 
          isbn: 'test isbn',
          title: 'test title',
          type: 'fiction',
        }))
      }),
    )

    server.listen();

    render(
      <MemoryRouter initialEntries={['/books/test']}>
        <Routes>
          <Route path='/books/:isbn' element={<Detail />} /> 
        </Routes>
      </MemoryRouter>
    );

    const details = await screen.findAllByRole('heading');

    expect(details[0]).toHaveTextContent('test title');

    expect(details[1]).toHaveTextContent('AUTHOR');
    expect(details[2]).toHaveTextContent('test author');

    expect(details[3]).toHaveTextContent('PUBLISHER');
    expect(details[4]).toHaveTextContent('test publisher');

    expect(details[5]).toHaveTextContent('CITY');
    expect(details[6]).toHaveTextContent('test city');

    expect(details[7]).toHaveTextContent('FORMAT');
    expect(details[8]).toHaveTextContent('test format');

    expect(details[9]).toHaveTextContent('YEAR');
    expect(details[10]).toHaveTextContent('test year');

    expect(details[11]).toHaveTextContent('ISBN');
    expect(details[12]).toHaveTextContent('test isbn');

    server.close()
  });
});
