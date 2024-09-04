const express = require('express');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Umożliwia przetwarzanie JSON
app.use(express.urlencoded({ extended: true })); // Umożliwia przetwarzanie danych formularza

// Routes
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

