import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RawMaterialsPage from './pages/RawMaterialsPage';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <Router>
      <div>
        <h1>Autoflex</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/raw-materials">Raw Materials</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<div>Página Inicial</div>} />
            <Route path="/raw-materials" element={<RawMaterialsPage />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
