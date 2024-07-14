import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import MongoDBConnector from './dal/mongodb';
import routes from './routes/index';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const dbConnector = MongoDBConnector.getInstance();
dbConnector.connect();

// Use the index route
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
