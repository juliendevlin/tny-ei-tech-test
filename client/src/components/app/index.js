import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Search from '../search'
import Nav from '../nav';
// import Detail from '../detail'

function App() {
  return (
    <BrowserRouter>
      <Nav />

      <Routes>
        <Route path="/" element={<Search />} />
        {/* <Route path="/books/:isbn" element={<Detail />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
