import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Search from './';

// Mock React Router's useNavigate hook
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  return {
    ...(jest.requireActual("react-router-dom")),
    useNavigate: () => mockNavigate,
  };
});

describe('Search component', () => {
  it('Should render search bar', () => {
    render (<Search />, {wrapper: BrowserRouter});
    const searchBar = screen.getByRole('searchbox');
    expect(searchBar).toBeInTheDocument();
  });

  it('Should render loading wheel awaiting API response', () => {
    render (<Search />, {wrapper: BrowserRouter});
    const loadingWheel = screen.getByTestId('loading-wheel');
    expect(loadingWheel).toBeInTheDocument();
  });

  it('Should render error message after unsucccesful API response', async () => {
    const server = setupServer(
      rest.get('http://localhost:3001/books', (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );
    
    server.listen();

    render (<Search />, {wrapper: BrowserRouter});

    const error = await screen.findByText(/Failed to load books/);
    expect(error).toBeInTheDocument();

    server.close();
  });

  describe('Successful API responses', () => {
    const server = setupServer(
      rest.get('http://localhost:3001/books', (req, res, ctx) => {
        return res(ctx.json([
          {
            isbn: 'test isbn 1',
            title: 'test title 1',
            author: 'test author 1',
            year: 2,
          },
          {
            isbn: 'test isbn 2',
            title: 'test title 2',
            author: 'test author 2',
            year: 1,
          }
        ]));
      }),
    );

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('Should render search results after successfull API call', async () => {
      render (<Search />, {wrapper: BrowserRouter});

      expect(await screen.findByText('test title 1')).toBeInTheDocument();
      expect(await screen.findByText('test author 1')).toBeInTheDocument();
      expect(await screen.findByText('1')).toBeInTheDocument();
      expect(await screen.findByText('test title 2')).toBeInTheDocument();
      expect(await screen.findByText('test author 2')).toBeInTheDocument();
      expect(await screen.findByText('2')).toBeInTheDocument();
    });

    it('Should sort search results by year', async () => {
      render (<Search />, {wrapper: BrowserRouter});

      const headings = await screen.findAllByRole('heading');
      expect(headings[2]).toHaveTextContent(1);
      expect(headings[5]).toHaveTextContent(2);
    });

    it('Should show all results by default/when the search bar is empty', async () => {
      render (<Search />, {wrapper: BrowserRouter});

      const item1 = await screen.findByText('test title 1');
      const item2 = await screen.findByText('test title 2');

      expect(item1).toBeInTheDocument();
      expect(item2).toBeInTheDocument();

      const searchBar = screen.getByRole('searchbox');
      fireEvent.change(searchBar, {target: {value: ''}});

      expect(item1).toBeInTheDocument();
      expect(item2).toBeInTheDocument();
    });

    it('Should filter results by title matches', async () => {
      render (<Search />, {wrapper: BrowserRouter});

      const item1 = await screen.findByText('test title 1');
      const item2 = await screen.findByText('test title 2');

      const searchBar = screen.getByRole('searchbox');
      fireEvent.change(searchBar, {target: {value: 'title 1'}});

      expect(item1).toBeInTheDocument();
      expect(item2).not.toBeInTheDocument();
    });

    it('Should filter results by author matches', async () => {
      render (<Search />, {wrapper: BrowserRouter});

      const item1 = await screen.findByText('test author 1');
      const item2 = await screen.findByText('test author 2');

      const searchBar = screen.getByRole('searchbox');
      fireEvent.change(searchBar, {target: {value: 'author 1'}});

      expect(item1).toBeInTheDocument();
      expect(item2).not.toBeInTheDocument();
    });

    it('Should redirect to /books/:isbn when clicking a result', async () => {
      render (<Search />, {wrapper: BrowserRouter});

      const searchItem = (await screen.findByText('test title 1'));
      fireEvent.click(searchItem);

      expect(mockNavigate).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/books/test isbn 1');
    });
  });
});
