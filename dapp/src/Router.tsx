import { Route, BrowserRouter, Routes } from "react-router-dom";

import Login from './pages/Login';
import List from './pages/List';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/list' element={<List />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;