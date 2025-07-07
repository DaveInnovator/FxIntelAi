import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-gray-800 px-4 py-3 flex items-center justify-between shadow-md relative">
      <h1 className="text-xl font-bold text-teal-400">FXIntel.AI</h1>

      {/* Desktop nav */}
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="hover:text-teal-400">Dashboard</Link>
        
        <Link to="/chat" className="hover:text-teal-400">Chat</Link>
        <Link to="/alerts" className="hover:text-teal-400">Alerts</Link>
      </div>

      {/* Hamburger menu for mobile */}
      <button onClick={toggleMenu} className="md:hidden text-teal-400">
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile nav dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-900 border-t border-gray-700 md:hidden z-10">
          <div className="flex flex-col space-y-2 p-4">
            <Link to="/" onClick={toggleMenu} className="hover:text-teal-400">Dashboard</Link>
            
            <Link to="/chat" onClick={toggleMenu} className="hover:text-teal-400">Chat</Link>
            <Link to="/alerts" onClick={toggleMenu} className="hover:text-teal-400">Alerts</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
