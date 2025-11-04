import { useEffect, useState } from 'react';

const Admin = () => {
  const API = import.meta.env.VITE_API_URL;
  const [hotels, setHotels] = useState([]);
  const [bills, setBills] = useState([]);
  const [newHotel, setNewHotel] = useState({
    name: '',
    location: '',
    mapsLink: '',
    link: '',
    description: '',
    rating: '',
    collection: '',
    pricePerNight: {
      Deluxe: '',
      Executive: '',
      Suite: '',
    },
    images: [],
    amenities: []
  });

  const [totalEarnings, setTotalEarnings] = useState(0);

  const fetchHotels = async () => {
    const res = await fetch(`${API}/hotels`);
    const data = await res.json();
    setHotels(data);
  };

  const fetchBills = async () => {
    try {
      const res = await fetch(`${API}/tables/bills`);
      const data = await res.json();
      setBills(data);
      const total = data.reduce((sum, bill) => sum + (bill.total || 0), 0);
      setTotalEarnings(total);
    } catch (err) {
      console.error('Failed to fetch bills:', err);
    }
  };

  useEffect(() => {
    fetchHotels();
    fetchBills();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('pricePerNight')) {
      const key = name.split('.')[1];
      setNewHotel((prev) => ({
        ...prev,
        pricePerNight: {
          ...prev.pricePerNight,
          [key]: value
        }
      }));
    } else if (name === 'images') {
      setNewHotel((prev) => ({ ...prev, images: value.split(',') }));
    } else if (name === 'amenities') {
      setNewHotel((prev) => ({ ...prev, amenities: value.split(',').map(a => a.trim()) }));
    } else {
      setNewHotel((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddHotel = async () => {
    try {
      const res = await fetch(`${API}/hotels`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHotel)
      });

      if (res.ok) {
        alert('✅ Hotel added');
        setNewHotel({
          name: '',
          location: '',
          mapsLink: '',
          link: '',
          description: '',
          rating: '',
          collection: '',
          pricePerNight: {
            Deluxe: '',
            Executive: '',
            Suite: '',
          },
          images: [],
          amenities: []
        });
        fetchHotels();
      } else {
        alert('❌ Failed to add hotel');
      }
    } catch (err) {
      console.error(err);
      alert('Error occurred');
    }
  };

  const handleDeleteHotel = async (id) => {
    if (!confirm('Are you sure you want to delete this hotel?')) return;

    try {
      const res = await fetch(`${API}/hotels/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        alert('🗑️ Hotel deleted');
        fetchHotels();
      } else {
        alert('❌ Failed to delete hotel');
      }
    } catch (err) {
      console.error(err);
      alert('Error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-indigo-400">🔧 Admin Panel</h1>

      <div className="text-center mb-8">
        <p className="text-xl font-semibold text-green-400">
          💰 Total Earnings: ₹{totalEarnings.toLocaleString()}
        </p>
      </div>

      <div className="bg-gray-800 p-4 rounded-xl mb-10">
        <h2 className="text-xl font-semibold mb-4 text-indigo-300">➕ Add New Hotel</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['name', 'location', 'mapsLink', 'link', 'description', 'rating', 'collection'].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field}
              value={newHotel[field]}
              onChange={handleInput}
              className="p-2 bg-gray-700 text-white rounded"
            />
          ))}
          <input
            type="text"
            name="pricePerNight.Deluxe"
            placeholder="Deluxe Price"
            value={newHotel.pricePerNight.Deluxe}
            onChange={handleInput}
            className="p-2 bg-gray-700 text-white rounded"
          />
          <input
            type="text"
            name="pricePerNight.Executive"
            placeholder="Executive Price"
            value={newHotel.pricePerNight.Executive}
            onChange={handleInput}
            className="p-2 bg-gray-700 text-white rounded"
          />
          <input
            type="text"
            name="pricePerNight.Suite"
            placeholder="Suite Price"
            value={newHotel.pricePerNight.Suite}
            onChange={handleInput}
            className="p-2 bg-gray-700 text-white rounded"
          />
          <input
            type="text"
            name="images"
            placeholder="Image URLs (comma separated)"
            value={newHotel.images.join(',')}
            onChange={handleInput}
            className="p-2 bg-gray-700 text-white rounded col-span-full"
          />
          <input
            type="text"
            name="amenities"
            placeholder="Amenities (comma separated)"
            value={newHotel.amenities.join(',')}
            onChange={handleInput}
            className="p-2 bg-gray-700 text-white rounded col-span-full"
          />
        </div>

        <button
          onClick={handleAddHotel}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded font-semibold"
        >
          ➕ Add Hotel
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-indigo-300">🏨 Hotel List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div key={hotel._id} className="bg-gray-800 rounded-lg p-4 border border-indigo-600 space-y-2">
            <h3 className="text-lg font-bold text-indigo-300">{hotel.name}</h3>
            <p className="text-sm text-gray-300">{hotel.location}</p>
            <p className="text-sm text-gray-400 line-clamp-2">{hotel.description}</p>
            <button
              onClick={() => handleDeleteHotel(hotel._id)}
              className="mt-2 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
            >
              🗑️ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
