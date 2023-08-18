import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Search from '../search'
// import Detail from '../detail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Search />} /> */}
        {/* <Route path="/books/:isbn" element={<Detail />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
