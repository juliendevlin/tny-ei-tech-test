import { Routes, Route } from 'react-router-dom';
import Search from '../search'
import Nav from '../nav';
import Detail from '../detail';
import NotFound from '../not-found';

function App() {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/books/:isbn" element={<Detail />} />

        {/* Catch-all route that renders 'not found' page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
