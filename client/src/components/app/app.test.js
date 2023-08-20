import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './';

describe('App component', () => {
  it('Should render the search page with top navigation at the root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const searchBar = screen.getByRole('searchbox');
    expect(searchBar).toBeInTheDocument();

    const logo = screen.getByText('[books]');
    expect(logo).toBeInTheDocument();
  });

  it('Should render the detail page with top navigation at the /books/:isbn path', () => {
    render(
      <MemoryRouter initialEntries={['/books/isbn']}>
        <App />
      </MemoryRouter>
    );

    const detailPage = screen.getByTestId('detail');
    expect(detailPage).toBeInTheDocument();

    const logo = screen.getByText('[books]');
    expect(logo).toBeInTheDocument();
  });

  it('Should render the not found page with top navigation at all other paths', () => {
    render(
      <MemoryRouter initialEntries={['/unknown/route']}>
        <App />
      </MemoryRouter>
    );

    const notFound = screen.getByText('Page Not Found');
    expect(notFound).toBeInTheDocument();

    const logo = screen.getByText('[books]');
    expect(logo).toBeInTheDocument();
  });
});
