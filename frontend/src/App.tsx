import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RawMaterialsPage from './pages/RawMaterialsPage';

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
            {/* Outros links virão aqui */}
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<div>Página Inicial</div>} />
            <Route path="/raw-materials" element={<RawMaterialsPage />} />
            {/* Outras rotas virão aqui */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
