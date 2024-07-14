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
exports.cachePhotos = exports.getCachedPhotos = void 0;
const redisClient_1 = __importDefault(require("../dal/redisClient"));
const TTL = parseInt(process.env.REDIS_TTL || '3600', 10);
const getCachedPhotos = (count) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cachedData = yield redisClient_1.default.get(`photos:${count}`);
        return cachedData ? JSON.parse(cachedData) : null;
    }
    catch (error) {
        console.error('Error getting cached photos', error);
        return null;
    }
});
exports.getCachedPhotos = getCachedPhotos;
const cachePhotos = (count, photos) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisClient_1.default.setEx(`photos:${count}`, TTL, JSON.stringify(photos));
    }
    catch (error) {
        console.error('Error caching photos', error);
    }
});
exports.cachePhotos = cachePhotos;
