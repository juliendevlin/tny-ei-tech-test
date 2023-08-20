import { waitFor, renderHook } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node'
import useFetchBooks from './useFetchBooks.js';
import useFetchBook from './useFetchBook.js';

describe('useFetchBook', () => {
  it('Should return isLoading as true when waiting for a response', () => {
    const server = setupServer(
      rest.get('http://localhost:3001/books/test', (req, res, ctx) => {
        return res(ctx.json('success!'));
      }),
    );

    server.listen();

    const { result } = renderHook(() => useFetchBook('test'));
    expect(result.current.isLoading).toBe(true);

    server.close();
  });

  it('Should return error value and isLoading as false after unsuccessful call', async () => {
    const server = setupServer(
      rest.get('http://localhost:3001/books/test', (req, res, ctx) => {
        return res(ctx.status(400));
      }),
    );

    server.listen();

    const { result } = renderHook(() => useFetchBook('test'));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await waitFor(() => expect(result.current.error).not.toBeNull());

    server.close();
  });

  it('Should return book value and isLoading as false after successful call', async () => {
    const server = setupServer(
      rest.get('http://localhost:3001/books/test', (req, res, ctx) => {
        return res(ctx.json('success!'));
      }),
    );

    server.listen();

    const { result } = renderHook(() => useFetchBook('test'));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await waitFor(() => expect(result.current.book).toBe('success!'));

    server.close();
  });
});

describe('useFetchBooks', () => {
  it('Should return isLoading as true when waiting for a response', () => {
    const server = setupServer(
      rest.get('http://localhost:3001/books', (req, res, ctx) => {
        return res(ctx.json('success!'));
      }),
    );

    server.listen();

    const { result } = renderHook(useFetchBooks);
    expect(result.current.isLoading).toBe(true);

    server.close();
  });

  it('Should return error value and isLoading as false after unsuccessful call', async () => {
    const server = setupServer(
      rest.get('http://localhost:3001/books', (req, res, ctx) => {
        return res(ctx.status(400));
      }),
    );

    server.listen();

    const { result } = renderHook(useFetchBooks);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await waitFor(() => expect(result.current.error).not.toBeNull());

    server.close();
  });

  it('Should return books value and isLoading as false after successful call', async () => {
    const server = setupServer(
      rest.get('http://localhost:3001/books', (req, res, ctx) => {
        return res(ctx.json('success!'));
      }),
    );

    server.listen();

    const { result } = renderHook(useFetchBooks);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await waitFor(() => expect(result.current.books).toBe('success!'));

    server.close();
  });
});
