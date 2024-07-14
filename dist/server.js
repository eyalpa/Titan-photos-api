"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const mongodb_1 = __importDefault(require("./dal/mongodb")); // Update the path if necessary
const routes_1 = __importDefault(require("./routes")); // Update the path if necessary
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Connect to MongoDB
const dbConnector = mongodb_1.default.getInstance();
dbConnector.connect();
// Use the index route
app.use('/api', routes_1.default);
// Error handling middleware
app.use(errorHandler_1.default);
// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
