const HotelCard = ({ hotel }) => {
  const {
    name,
    location,
    description,
    rating,
    collection,
    pricePerNight,
    amenities,
    roomTypes,
    link,
    mapsLink
  } = hotel;

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl shadow-xl p-6 flex flex-col h-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-indigo-500">
      
      {/* Name */}
      <h2 className="text-2xl font-bold mb-1 text-indigo-300">{name}</h2>

      {/* Location */}
      <p className="text-sm italic text-gray-400 mb-2">{location}</p>

      {/* Description */}
      <p className="text-sm text-gray-200 mb-2">{description}</p>

      {/* Rating */}
      <p className="text-yellow-400 font-medium text-sm mb-2">⭐ {rating} / 5</p>

      {/* Collection */}
      {collection && (
        <p className="text-sm text-indigo-400 mb-3">
          <strong>Collection:</strong> {collection}
        </p>
      )}

      {/* Room Prices */}
      {pricePerNight && (
        <div className="text-sm text-gray-200 space-y-1 mb-3">
          <p className="font-semibold underline">Room Prices (per night):</p>
          {pricePerNight.Deluxe && <p>• Deluxe: ₹{pricePerNight.Deluxe.toLocaleString()}</p>}
          {pricePerNight.Executive && <p>• Executive: ₹{pricePerNight.Executive.toLocaleString()}</p>}
          {pricePerNight.Suite && <p>• Suite: ₹{pricePerNight.Suite.toLocaleString()}</p>}
        </div>
      )}

      {/* Amenities */}
      {amenities && Array.isArray(amenities) && amenities.length > 0 && (
        <div className="text-sm text-gray-200 mb-3">
          <p className="font-semibold underline">Amenities:</p>
          <ul className="pl-4 list-disc">
            {amenities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Room Types */}
      {roomTypes && Array.isArray(roomTypes) && roomTypes.length > 0 && (
        <div className="text-sm text-gray-200 mb-3">
          <p className="font-semibold underline">Room Types:</p>
          <p>{roomTypes.join(', ')}</p>
        </div>
      )}

      {/* Links */}
      <div className="mt-auto pt-4 flex justify-between text-indigo-400 text-sm font-medium">
        <a href={link} target="_blank" rel="noreferrer" className="hover:underline">🌐 Website</a>
        <a href={mapsLink} target="_blank" rel="noreferrer" className="hover:underline">📍 Map</a>
      </div>
    </div>
  );
};

export default HotelCard;
