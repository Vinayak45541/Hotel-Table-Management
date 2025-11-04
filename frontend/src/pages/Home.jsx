import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video with pointer events disabled */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
        src="HOTEL.mp4"
        autoPlay
        muted
        loop
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

      {/* Top Right Buttons */}
<div className="absolute top-4 right-4 z-200 flex gap-4">
  <Link
    to="/login"
    className="bg-gradient-to-r from-[#4e54c8] to-[#8f94fb] text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
  >
    Login
  </Link>
  <Link
    to="/signup"
    className="bg-gradient-to-r from-[#8f94fb] to-[#4e54c8] text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
  >
    Sign Up
  </Link>
</div>

      {/* Centered Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-5xl font-bold drop-shadow-xl">Welcome to Luxury Hotels</h1>
        <p className="mt-4 text-lg max-w-xl">Explore world-class hotels and reserve your perfect stay now.</p>
      </div>
    </div>
  );
};

export default Home;
