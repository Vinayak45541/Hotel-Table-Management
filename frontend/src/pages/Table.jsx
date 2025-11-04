import { useState } from 'react';
import TableCard from '../components/TableCard';

const Table = () => {
  const [tables, setTables] = useState(
    Array.from({ length: 15 }, (_, i) => ({
      number: i + 1,
      status: 'Available',
      orders: [],
    }))
  );

  const updateStatus = (index, newStatus) => {
    const updated = [...tables];
    updated[index].status = newStatus;
    setTables(updated);
  };

  const addOrder = (index, item, price) => {
    const updated = [...tables];
    updated[index].orders.push({ item, price: parseFloat(price) });
    setTables(updated);
  };
const generateBill = async (index) => {
  const table = tables[index];
  const total = table.orders.reduce((sum, order) => sum + order.price, 0);

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/tables/bill`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tableNumber: table.number,
        status: table.status,
        orders: table.orders,
        total,
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert(`✅ Bill generated for Table ${table.number} (₹${total})`);
      // Clear orders locally
      const updated = [...tables];
      updated[index].orders = [];
      setTables(updated);
    } else {
      alert('❌ Failed to generate bill: ' + data.message);
    }
  } catch (err) {
    console.error(err);
    alert('❌ Error occurred while generating bill');
  }
};



  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-8">📋 Table Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {tables.map((table, index) => (
          <TableCard
            key={table.number}
            table={table}
            index={index}
            updateStatus={updateStatus}
            addOrder={addOrder}
            generateBill={generateBill}
          />
        ))}
      </div>
    </div>
  );
};

export default Table;
