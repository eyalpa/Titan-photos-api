import axios, { AxiosRequestConfig } from 'axios';
import Bottleneck from 'bottleneck';
import { ReservationQueryParams, ReservationResponse,Reservation } from '../types';
import { getAccessToken } from './tokenService';

// Configure Bottleneck
const limiter = new Bottleneck({
    maxConcurrent: 5, // Max 5 concurrent requests
    minTime: 200 // At least 200ms between requests
});

class HostawayClient {
    private apiBaseUrl: string;

    constructor() {
        this.apiBaseUrl = 'https://api.hostaway.com/v1';
    }

    async getReservations(params: ReservationQueryParams): Promise<ReservationResponse> {
        return limiter.schedule(async () => {
            try {
                const authToken = await getAccessToken(); // Get or refresh token

                const config: AxiosRequestConfig = {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Cache-control': 'no-cache',
                    },
                    params,
                };
                const response = await axios.get(`${this.apiBaseUrl}/reservations`, config);

                // Extract and map the data to ReservationResponse with only required fields
                const reservations: Reservation[] = response.data.result.map((res: any) => ({
                    id: res.id,
                    checkIn: res.arrivalDate,     // Assuming the API returns check-in date in `checkIn`
                    checkOut: res.departureDate,   // Assuming the API returns check-out date in `checkOut`
                    price: res.totalPrice,
                    created_at: res.insertedOn,
                    guest_name: `${res.guestFirstName} ${res.guestLastName}` ,
                    listingId: res.listingMapId,
                    status: res.status,
                    channel_name: res.channelName
                }));
                
                const totalCount = response.data.count;
                
                return { reservations, totalCount };
            } catch (error) {
                console.error('Error fetching reservations:', error);
                throw error;
            }
        });
    }
    // Method to register a webhook
    async registerWebhook(login: string, password: string, webhookUrl?: string): Promise<void> {
        try {
            const authToken = await getAccessToken(); // Get or refresh token

            const config: AxiosRequestConfig = {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-type': 'application/json',
                    'Cache-control': 'no-cache',
                },
            };

            // Construct the webhook URL using environment variables
            const ip = process.env.SERVER_IP;
            const port = process.env.PORT;
            webhookUrl = webhookUrl?? `http://${ip}:${port}/api/reservation/webhook`;

            const requestBody = {
                listingMapId: null,
                channelId: null,
                isEnabled: "1",
                url: webhookUrl,
                login: login,
                password: password
            };
       
            const response = await axios.post(`${this.apiBaseUrl}/webhooks/reservations`, requestBody, config);

            console.log('Webhook registered successfully:', response.data);
        } catch (error:any) {
            console.error('Failed to register webhook:', error.response?.data || error.message);
            throw error;
        }
    }

    
}

export default HostawayClient;
