import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js'; // Upewnij się, że ścieżka jest prawidłowa

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const seedProducts = async () => {
  await connectDB();

  const products = [
    {
      name: 'Sample Product 1',
      price: 19.99,
      description: 'Description for Sample Product 1.',
      imageUrl: 'https://example.com/sample-product-1.jpg',
    },
    {
      name: 'Sample Product 2',
      price: 39.99,
      description: 'Description for Sample Product 2.',
      imageUrl: 'https://example.com/sample-product-2.jpg',
    },
    // Dodaj więcej produktów według potrzeby
  ];

  try {
    await Product.insertMany(products);
    console.log('Products added successfully');
  } catch (error) {
    console.error('Error adding products:', error.message);
  }

  mongoose.connection.close();
};

seedProducts();
