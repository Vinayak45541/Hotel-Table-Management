import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-700 to-gray-500 fixed w-full top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <div className="text-3xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">
            Luxury
          </span>
          <span className="text-white">Stay</span>
        </div>
        
        <div className="flex space-x-10">
          <Link
            to="/hotels"
            className="relative text-gray-300 font-medium hover:text-white transition-all duration-300 group"
          >
            <span className="flex items-center">
              <span className="mr-2 opacity-70 group-hover:opacity-100">🏨</span>
              Hotels
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-500 group-hover:w-full"></span>
            </span>
          </Link>
          <Link
            to="/table"
            className="relative text-gray-300 font-medium hover:text-white transition-all duration-300 group"
          >
            <span className="flex items-center">
              <span className="mr-2 opacity-70 group-hover:opacity-100">📊</span>
              Table
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-500 group-hover:w-full"></span>
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;