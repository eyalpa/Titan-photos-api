import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

class MongoDBConnector {
  private static instance: MongoDBConnector;
  private mongoose: typeof mongoose;
  private connectionString: string;
  private options: mongoose.ConnectOptions;
  private isConnected: boolean;
  private retryCount: number;
  private maxRetries: number;

  private constructor(mongooseInstance = mongoose) {
    this.mongoose = mongooseInstance;
    this.connectionString = `mongodb://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASSWORD || '')}@${process.env.DB_HOST}:${process.env.DB_PORT}`;
    this.options = {
      dbName: process.env.DB_NAME,
      autoIndex: true,
      autoCreate: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    this.isConnected = false;
    this.retryCount = 0;
    this.maxRetries = 5;
  }

  static getInstance(mongooseInstance?: typeof mongoose) {
    if (!MongoDBConnector.instance) {
      MongoDBConnector.instance = new MongoDBConnector(mongooseInstance);
    }
    return MongoDBConnector.instance;
  }

  async connect() {
    try {
      await this.mongoose.connect(this.connectionString, this.options);
      console.log('MongoDB connected');
      this.isConnected = true;
    } catch (err) {
      console.error('MongoDB connection error:', err);
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        const delay = Math.min(Math.pow(2, this.retryCount) * 1000, 30000);
        console.log(`Retrying connection (${this.retryCount}/${this.maxRetries}) in ${delay / 1000} seconds...`);
        setTimeout(() => this.connect(), delay);
      } else {
        throw new Error(`Maximum retry attempts (${this.maxRetries}) reached.`);
      }
    }
  }
}

export default MongoDBConnector;
