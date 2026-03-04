import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import styled from 'styled-components';
import RawMaterialsPage from './pages/RawMaterialsPage';
import ProductsPage from './pages/ProductsPage';
import ProductionSuggestionPage from './pages/ProductionSuggestionPage';
import { GlobalStyle } from './styles/GlobalStyle';
import { Container } from './styles/components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #007bff;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    color: white;
    margin: 0;
  }
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
  }

  li {
    margin-left: 1.5rem;
  }

  a {
    color: white;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const MainContent = styled(Container)`
  flex-grow: 1;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;


function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <AppContainer>
          <Header>
            <h1>Autoflex</h1>
            <Nav>
              <ul>
                <li><Link to="/raw-materials">Raw Materials</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/production-suggestion">Suggestion</Link></li>
              </ul>
            </Nav>
          </Header>
          <MainContent>
            <Routes>
              <Route path="/" element={<RawMaterialsPage />} />
              <Route path="/raw-materials" element={<RawMaterialsPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/production-suggestion" element={<ProductionSuggestionPage />} />
            </Routes>
          </MainContent>
        </AppContainer>
      </Router>
    </>
  );
}

export default App;
