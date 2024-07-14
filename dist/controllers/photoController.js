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
exports.getRandomPhotos = void 0;
const axios_1 = __importDefault(require("axios"));
const cache_1 = require("../utils/cache");
const UNSPLASH_URL = 'https://api.unsplash.com/photos/random';
const getRandomPhotos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const count = parseInt(req.params.count, 10);
    const cachedPhotos = yield (0, cache_1.getCachedPhotos)(count);
    if (cachedPhotos) {
        return res.json(cachedPhotos);
    }
    try {
        const response = yield axios_1.default.get(UNSPLASH_URL, {
            params: { count },
            headers: {
                Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
            }
        });
        const photoUrls = response.data.map((photo) => photo.urls.regular);
        yield (0, cache_1.cachePhotos)(count, photoUrls);
        res.json(photoUrls);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching photos', error });
    }
});
exports.getRandomPhotos = getRandomPhotos;
