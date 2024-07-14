"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class MongoDBConnector {
    constructor(mongooseInstance = mongoose_1.default) {
        this.mongoose = mongooseInstance;
        this.connectionString = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`;
        this.options = {
            dbName: process.env.DB_NAME,
            user: process.env.DB_USER,
            pass: encodeURIComponent(process.env.DB_PASSWORD || ''),
            autoIndex: true,
            autoCreate: true
        };
        this.isConnected = false;
        this.retryCount = 0;
        this.maxRetries = 5;
    }
    static getInstance() {
        if (!MongoDBConnector.instance) {
            MongoDBConnector.instance = new MongoDBConnector();
        }
        return MongoDBConnector.instance;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.mongoose.connect(this.connectionString, this.options);
                console.log('MongoDB connected');
                this.isConnected = true;
            }
            catch (err) {
                console.error('MongoDB connection error:', err);
                if (this.retryCount < this.maxRetries) {
                    this.retryCount++;
                    const delay = Math.min(Math.pow(2, this.retryCount) * 1000, 30000); // Exponential backoff with maximum delay of 30 seconds
                    console.log(`Retrying connection (${this.retryCount}/${this.maxRetries}) in ${delay / 1000} seconds...`);
                    setTimeout(() => this.connect(), delay);
                }
                else {
                    throw new Error(`Maximum retry attempts (${this.maxRetries}) reached.`);
                }
            }
        });
    }
}
exports.default = MongoDBConnector;
