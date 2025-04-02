import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import CreateBook from './components/CreateBook';
import { useEffect } from 'react';
import { initializeDefaultBooks } from './services/bookService';
import { useAuth } from './Authentication/AuthContext';

import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import CatalogPage from './components/pages/CatalogPage';
import BookDetailsPage from './components/pages/BookDetailsPage';
import ProfilePage from './components/pages/ProfilePage';
import EditBookPage from './components/pages/EditBookPage';

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
            <Route 
              path="/profile" 
              element={
                auth?.accessToken 
                  ? <ProfilePage /> 
                  : <Navigate to="/login" replace />
              } 
            />
            <Route path="/edit/:id" element={<EditBookPage />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

