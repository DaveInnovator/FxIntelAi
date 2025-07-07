import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

import Chat from './pages/Chat';
import Alerts from './pages/Alerts';
import Navbar from './Components/Navbar';
import Footer from './components/Footer';


function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
     <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        
        <Route path="/chat" element={<Chat />} />
        <Route path="/alerts" element={<Alerts />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
