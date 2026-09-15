import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import Customer from './models/Customer.js';
import Supplier from './models/Supplier.js';
import Sale from './models/Sale.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
// Vercel Serverless needs this to be careful about not reconnecting multiple times
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/grocery_db';
  try {
    const db = await mongoose.connect(mongoURI);
    isConnected = db.connections[0].readyState === 1;
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

app.get('/api', (req, res) => {
  res.send('Grocery Store API is running');
});

// Products API
app.get('/api/products', async (req, res) => {
  await connectDB();
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/products', async (req, res) => {
  await connectDB();
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  await connectDB();
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Customers API
app.get('/api/customers', async (req, res) => {
  await connectDB();
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/customers', async (req, res) => {
  await connectDB();
  try {
    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

app.delete('/api/customers/:id', async (req, res) => {
  await connectDB();
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Suppliers API
app.get('/api/suppliers', async (req, res) => {
  await connectDB();
  try {
    const suppliers = await Supplier.find().sort({ createdAt: -1 });
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/suppliers', async (req, res) => {
  await connectDB();
  try {
    const newSupplier = new Supplier(req.body);
    const savedSupplier = await newSupplier.save();
    res.status(201).json(savedSupplier);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

app.delete('/api/suppliers/:id', async (req, res) => {
  await connectDB();
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.json({ message: 'Supplier deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Sales API
app.get('/api/sales', async (req, res) => {
  await connectDB();
  try {
    const sales = await Sale.find().sort({ createdAt: -1 });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/sales', async (req, res) => {
  await connectDB();
  try {
    const newSale = new Sale(req.body);
    const savedSale = await newSale.save();
    res.status(201).json(savedSale);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

app.delete('/api/sales/:id', async (req, res) => {
  await connectDB();
  try {
    await Sale.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sale deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Only start the server locally (Vercel will export the app)
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    connectDB();
  });
}

export default app;
