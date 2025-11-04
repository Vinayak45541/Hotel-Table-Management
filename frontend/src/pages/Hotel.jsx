import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [currentImage, setCurrentImage] = useState({});

  const fetchHotels = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/hotels`);
      const data = await res.json();
      setHotels(data);
      setFiltered(data);
    } catch (err) {
      console.error('Failed to fetch hotels:', err);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // Auto-switch image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        const updated = {};
        filtered.forEach((hotel, i) => {
          const total = hotel.images?.length || 1;
          updated[i] = (prev[i] + 1) % total || 0;
        });
        return updated;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [filtered]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearch(term);
    const filteredData = hotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(term)
    );
    setFiltered(filteredData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navbar />

      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-white">🏨 Explore Hotels</h1>

        <input
          type="text"
          placeholder="Search hotels..."
          value={search}
          onChange={handleSearch}
          className="w-full p-3 mb-6 bg-gray-100 text-gray-800 rounded-lg border-none focus:ring-2 focus:ring-indigo-500 shadow-md"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length === 0 ? (
            <p className="text-gray-400 text-lg col-span-full">No hotels found.</p>
          ) : (
            filtered.map((hotel, idx) => {
              const images = hotel.images || [];
              const index = currentImage[idx] || 0;
              const currentImg =
                images[index] ||
                'https://via.placeholder.com/400x250?text=No+Image';

              return (
                <div
                  key={idx}
                  className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] border border-indigo-600"
                >
                  {/* Image Carousel */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImg}
                        src={currentImg}
                        alt={hotel.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </AnimatePresence>
                  </div>

                  {/* Hotel Info */}
                  <div className="p-5 space-y-3">
                    <h2 className="text-2xl font-semibold text-indigo-400">{hotel.name}</h2>
                    <p className="text-sm text-gray-300 italic">{hotel.location}</p>
                    <p className="text-sm text-gray-200">{hotel.description}</p>

                    {/* Collection */}
                    {hotel.collection && (
                      <p className="text-xs bg-indigo-500 text-white inline-block px-3 py-1 rounded-full font-medium mt-2">
                        {hotel.collection}
                      </p>
                    )}

                    {/* Rating */}
                    <div className="flex items-center text-yellow-400 text-sm mt-2">
                      ⭐ {hotel.rating} / 5
                    </div>

                    {/* Prices */}
                    <div className="mt-3 space-y-1 text-sm text-gray-200">
                      <div><strong>Deluxe:</strong> ₹{hotel.pricePerNight?.Deluxe?.toLocaleString()}</div>
                      <div><strong>Executive:</strong> ₹{hotel.pricePerNight?.Executive?.toLocaleString()}</div>
                      <div><strong>Suite:</strong> ₹{hotel.pricePerNight?.Suite?.toLocaleString()}</div>
                    </div>

                    {/* Amenities */}
                    {hotel.amenities?.length > 0 && (
                      <div className="mt-3 text-sm text-gray-100">
                        <p className="font-semibold mb-1">Amenities:</p>
                        <div className="flex flex-wrap gap-2">
                          {hotel.amenities.map((item, i) => (
                            <span
                              key={i}
                              className="bg-gray-600 text-white px-3 py-1 rounded-full text-xs shadow-sm"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex gap-5 mt-4 text-sm">
                      <a
                        href={hotel.mapsLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-400 hover:underline"
                      >
                        📍 View Map
                      </a>
                      <a
                        href={hotel.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-400 hover:underline"
                      >
                        🌐 Website
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Hotels;
