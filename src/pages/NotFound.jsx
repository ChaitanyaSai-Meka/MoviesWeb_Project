import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/NotFound.css';

function NotFound() {
  useEffect(() => {
      document.body.classList.add('no-navbar');
    
    return () => {
      document.body.classList.remove('no-navbar');
    };
  }, []);

  return (
    <div className="not-found-container">
      <h1 className="not-found-text">404 | Page Not Found</h1>
      <Link to="/" className="not-found-link">
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
