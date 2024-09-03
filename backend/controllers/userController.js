const connectToDB = require('../config/db');

async function getUser(req, res) {
  try {
    const db = await connectToDB();
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { getUser };
