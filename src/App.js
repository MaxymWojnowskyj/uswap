import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import { Navbar } from './components'
import { Home, Notif, Schedule, Lists, Account } from './pages'
//import Test from './pages/Test'

function App() {
  return (
      <Router>
        <div className="navbar">
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/notif" element={<Notif />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
