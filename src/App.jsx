import { Routes,Route} from 'react-router-dom';
import './css/App.css'
import Home from './pages/home'
import { MovieProvider } from './contexts/MovieContext';
import Favorites from './pages/favorites';
import NavBar from './components/navbar';

function App() {

  return (
    <MovieProvider>
      <NavBar/>
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/favorites' element={<Favorites/>}/>
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App
