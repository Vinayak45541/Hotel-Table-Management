import { useEffect, useState } from 'react';

const TablePage = () => {
  const [tables, setTables] = useState([]);
  const [orderItem, setOrderItem] = useState({});
  const [priceInput, setPriceInput] = useState({});
  const API = import.meta.env.VITE_API_URL;

  const fetchTables = async () => {
    const res = await fetch(`${API}/tables`);
    const data = await res.json();
    setTables(data);
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await fetch(`${API}/tables/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    fetchTables();
  };

  const handleOrderAdd = async (id) => {
    const item = orderItem[id];
    const price = parseFloat(priceInput[id]);

    if (!item || isNaN(price)) return alert('Enter item and price');

    await fetch(`${API}/tables/${id}/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item, price })
    });

    setOrderItem((prev) => ({ ...prev, [id]: '' }));
    setPriceInput((prev) => ({ ...prev, [id]: '' }));
    fetchTables();
  };

  const handleClear = async (id) => {
    await fetch(`${API}/tables/${id}/clear`, { method: 'POST' });
    fetchTables();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-400">🍽️ Table Management</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {tables.map((table) => (
          <div
            key={table._id}
            className="bg-gray-800 border border-indigo-500 rounded-2xl p-6 shadow-md flex flex-col justify-between"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-indigo-300">Table #{table.tableNumber}</h2>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Status:</label>
                <select
                  onChange={(e) => handleStatusChange(table._id, e.target.value)}
                  value={table.status}
                  className="w-full bg-gray-700 p-2 rounded-md text-white border border-indigo-400"
                >
                  <option>not booked</option>
                  <option>booked</option>
                  <option>in use</option>
                  <option>not in use</option>
                </select>
              </div>

              <div>
                <h3 className="font-medium text-indigo-200 mb-2">Add Order:</h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <input
                    type="text"
                    placeholder="Item"
                    value={orderItem[table._id] || ''}
                    onChange={(e) =>
                      setOrderItem((prev) => ({ ...prev, [table._id]: e.target.value }))
                    }
                    className="flex-1 p-2 bg-gray-700 rounded-md text-white"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={priceInput[table._id] || ''}
                    onChange={(e) =>
                      setPriceInput((prev) => ({ ...prev, [table._id]: e.target.value }))
                    }
                    className="w-28 p-2 bg-gray-700 rounded-md text-white"
                  />
                </div>
                <button
                  onClick={() => handleOrderAdd(table._id)}
                  className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-md text-white font-semibold"
                >
                  ➕ Add Order
                </button>
              </div>

              <div className="text-sm text-gray-300 mt-4">
                <h4 className="font-semibold text-indigo-300 mb-1">🧾 Orders:</h4>
                {table.orders?.length === 0 ? (
                  <p>No orders yet</p>
                ) : (
                  <ul className="list-disc list-inside space-y-1">
                    {table.orders.map((o, idx) => (
                      <li key={idx}>
                        {o.item} - ₹{o.price}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <p className="mt-2 text-lg text-green-300 font-semibold">
                💰 Total: ₹{table.total}
              </p>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => handleClear(table._id)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white text-sm w-full"
              >
                🧹 Clear Table / Generate Bill
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablePage;
