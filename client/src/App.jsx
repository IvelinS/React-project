import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import { Link } from 'react-router-dom';
import CreateBook from './components/CreateBook';
import { useEffect } from 'react';
import { initializeDefaultBooks } from './services/bookService';
import { useAuth } from './Authentication/AuthContext';

import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import CatalogPage from './components/pages/CatalogPage';
import BookDetailsPage from './components/pages/BookDetailsPage';

function App() {
  const { auth } = useAuth();

  useEffect(() => {
    initializeDefaultBooks();
  }, []);

  return (
    <Router>
      <Header />
      <main>
        <div className="App">
          <nav>
            <Link to="/create">Add New Book</Link>
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/books/:id" element={<BookDetailsPage />} />
            <Route 
              path="/create" 
              element={
                auth?.accessToken 
                  ? <CreateBook /> 
                  : <Navigate to="/login" replace />
              } 
            />
          </Routes>
        </div>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

