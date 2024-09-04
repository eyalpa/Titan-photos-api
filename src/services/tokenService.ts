import axios from 'axios';
import { HOSTAWAY_CLIENT_ID, HOSTAWAY_CLIENT_SECRET } from '../config/envConfig';

const HOSTAWAY_TOKEN_URL = 'https://api.hostaway.com/v1/accessTokens';

interface TokenResponse {
    token_type: string;
    expires_in: number;
    access_token: string;
}

let accessToken: string | null = null;
let tokenExpiry: number | null = null;

async function generateAccessToken(): Promise<void> {
    try {
        const response = await axios.post<TokenResponse>(
            HOSTAWAY_TOKEN_URL,
            `grant_type=client_credentials&client_id=${HOSTAWAY_CLIENT_ID}&client_secret=${HOSTAWAY_CLIENT_SECRET}&scope=general`,
            {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Cache-control': 'no-cache',
                },
            }
        );

        accessToken = response.data.access_token;
        tokenExpiry = Date.now() + response.data.expires_in * 1000; // Convert seconds to milliseconds
    } catch (error) {
        console.error('Error generating access token:', error);
        throw error;
    }
}

async function getAccessToken(): Promise<string> {
    // Refresh token if it is missing or expired
    if (!accessToken || !tokenExpiry || Date.now() >= tokenExpiry) {
        await generateAccessToken();
    }
    return accessToken!;
}

export { getAccessToken };
