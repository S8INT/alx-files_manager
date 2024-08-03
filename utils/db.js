// utils/db.js

const { MongoClient } = require('mongodb');
require('dotenv').config();

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const uri = `mongodb://${host}:${port}`;
    this.client = new MongoClient(uri, { useUnifiedTopology: true });
    this.database = database;

    this.client.connect((err) => {
      if (err) {
        console.error('Failed to connect to MongoDB', err);
      } else {
        console.log('Connected successfully to MongoDB');
      }
    });
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const db = this.client.db(this.database);
    const collection = db.collection('users');
    const count = await collection.countDocuments();
    return count;
  }

  async nbFiles() {
    const db = this.client.db(this.database);
    const collection = db.collection('files');
    const count = await collection.countDocuments();
    return count;
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
