import { Routes,Route, useLocation} from 'react-router-dom';
import './css/App.css'
import Home from './pages/home'
import { MovieProvider } from './contexts/MovieContext';
import Favorites from './pages/favorites';
import NavBar from './components/navbar';
import Profile from './pages/profile';
import LoginSignup from './auth/login_signup';
import AuthMiddleware from './middleware/AuthMiddleware';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login_signup';

  return (
    <MovieProvider>
      {!isLoginPage && <NavBar/>}
      <main className='main-content'>
        <Routes>
          <Route path='/' element={
            <AuthMiddleware requireAuth={true}>
              <Home/>
            </AuthMiddleware>
          }/>
          <Route path='/favorites' element={
            <AuthMiddleware requireAuth={true}>
              <Favorites/>
            </AuthMiddleware>
          }/>
          <Route path='/profile' element={
            <AuthMiddleware requireAuth={true}>
              <Profile/>
            </AuthMiddleware>
          }/>
          <Route path='/login_signup' element={
            <AuthMiddleware requireAuth={false}>
              <LoginSignup/>
            </AuthMiddleware>
          }/>
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App
