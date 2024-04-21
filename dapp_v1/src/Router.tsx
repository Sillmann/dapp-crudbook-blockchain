import { Route, BrowserRouter, Routes } from "react-router-dom";

import Login from './pages/Login';
import List from './pages/List';
import AddBook from './pages/AddBook';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/list' element={<List />} />
        <Route path='/add' element={<AddBook />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;