import Table from '../models/Table.js';

export const getTables = async (req, res) => {
  const tables = await Table.find();
  res.json(tables);
};

export const updateTableStatus = async (req, res) => {
  const { status } = req.body;
  const updated = await Table.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(updated);
};

export const addOrderToTable = async (req, res) => {
  const { item, price } = req.body;
  const table = await Table.findById(req.params.id);
  table.orders.push({ item, price });
  table.total += price;
  await table.save();
  res.json(table);
};

export const clearTable = async (req, res) => {
  const table = await Table.findById(req.params.id);
  table.orders = [];
  table.total = 0;
  table.status = 'not booked';
  await table.save();
  res.json({ message: 'Table cleared and reset' });
};
