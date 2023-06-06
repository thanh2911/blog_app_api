import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PageRender from './PageRender';

const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path='/' element={<PageRender />} />
        <Route path='/:page' element={<PageRender />} />
        <Route path='/:page/:slug' element={<PageRender />} />
        {/* <Route path='/customers' element={<Customers />} /> */}
      </Routes>
    </div>
  )
}

export default App
