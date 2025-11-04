import { useState } from 'react';

const statusColors = {
  Available: 'bg-green-200 text-black',
  Booked: 'bg-yellow-300 text-black',
  'In Use': 'bg-red-300 text-black',
  'Not In Use': 'bg-gray-300 text-black',
};

const TableCard = ({ table, index, updateStatus, addOrder, generateBill }) => {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    if (item && price) {
      addOrder(index, item, price);
      setItem('');      // ✅ Clear item input
      setPrice('');     // ✅ Clear price input
    }
  };

   
  return (
    <div
      className={`rounded-xl p-4 shadow-lg space-y-4 ${
        statusColors[table.status] || 'bg-white'
      } transition duration-300 flex flex-col justify-between`}
    >
      <div>
        <h2 className="text-xl font-bold mb-2">Table {table.number}</h2>

        <div className="mb-4">
          <label className="text-sm font-medium">Status: </label>
          <select
            className="ml-2 bg-white p-1 rounded text-black"
            value={table.status}
            onChange={(e) => updateStatus(index, e.target.value)}
          >
            <option>Available</option>
            <option>Booked</option>
            <option>In Use</option>
            <option>Not In Use</option>
          </select>
        </div>

        <div className="mb-2">
          <h4 className="font-semibold text-sm mb-1">Orders:</h4>
          {table.orders.length === 0 ? (
            <p className="text-sm text-gray-700">No orders yet.</p>
          ) : (
            <ul className="list-disc list-inside text-sm space-y-1">
              {table.orders.map((order, i) => (
                <li key={i}>
                  {order.item} - ₹{order.price}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ➕ Add Order Section */}
        <div className="mt-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Item"
              className="p-2 rounded bg-white text-black flex-1"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              className="p-2 rounded bg-white text-black w-28"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <button
            className="mt-2 bg-indigo-600 w-full py-2 rounded text-white hover:bg-indigo-700"
            onClick={handleAdd}
          >
            ➕ Add Order
          </button>
        </div>
      </div>

      {/* 💰 Generate Bill Button */}
      <button
        onClick={() => generateBill(index)}
        className="w-full bg-green-600 mt-6 py-2 rounded hover:bg-green-700 text-white"
      >
        💰 Generate Bill
      </button>
    </div>
  );
};

export default TableCard;
