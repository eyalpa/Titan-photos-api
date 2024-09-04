import * as dotenv from 'dotenv';

dotenv.config();

const HOSTAWAY_CLIENT_ID = process.env.HOSTAWAY_CLIENT_ID;
const HOSTAWAY_CLIENT_SECRET = process.env.HOSTAWAY_CLIENT_SECRET;

if (!HOSTAWAY_CLIENT_ID || !HOSTAWAY_CLIENT_SECRET) {
    throw new Error('Environment variables HOSTAWAY_CLIENT_ID and HOSTAWAY_CLIENT_SECRET are required');
}

export { HOSTAWAY_CLIENT_ID, HOSTAWAY_CLIENT_SECRET };
