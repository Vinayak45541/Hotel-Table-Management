import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Hotel from './pages/Hotel';
import Table from './pages/Table';
import Admin from './pages/Admin';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/hotels" element={<Hotel />} />
      <Route path="/table" element={<Table />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  </Router>
);

export default App;
