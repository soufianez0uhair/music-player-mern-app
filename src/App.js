import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectUser } from './redux/authSlice';

import Header from './components/Header';
import Home from './pages/Home';
import AudioPlayer from './components/AudioPlayer';
import Register from './pages/Register';
import Login from './pages/Login';
import Menu from './components/Menu';
import Favorite from './pages/Favorite';

const App = () => {
  const user = useSelector(selectUser);

  return (
    <Router>
      <main className="App">
        <Header />
        <div className="bg"></div>
        <div className="pages">
          {user && <Menu />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/favorite" element={<Favorite />} />
          </Routes>
        </div>
        <AudioPlayer />
      </main>
    </Router>
  )
}

export default App;