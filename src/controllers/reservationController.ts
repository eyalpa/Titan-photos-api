import { Request, Response } from 'express'; // Import Request and Response types from Express
import HostawayClient from '../services/hostawayClient';
import { ReservationQueryParams ,ReservationResponse} from '../types';
import { Reservation } from '@/models/Reservation';

const hostawayClient = new HostawayClient();

async function fetchReservationsFunction(queryParamsList?: ReservationQueryParams[]): Promise<ReservationResponse[]> {
    // Check if queryParamsList is provided and has length; otherwise, default to a single request with no params
    const defaultParams: ReservationQueryParams = {}; // Empty object to get all reservations
    const effectiveQueryParamsList = queryParamsList && queryParamsList.length > 0 ? queryParamsList : [defaultParams];

    const promises = effectiveQueryParamsList.map(queryParams => hostawayClient.getReservations(queryParams));

    try {
        const results = await Promise.all(promises);
        results.forEach(async (reservations, index) => {
            const reservation = new Reservation(reservations);
            await reservation.save();
            console.log(`Reservations for request ${index + 1}:`, reservations);
        });
        return results;
    } catch (error) {
        console.error('Failed to fetch reservations:', error);
        throw error; // Throw error to be caught in the calling function
    }
}

// Express route handler function
export const fetchReservations = async (req: Request, res: Response) => {
    try {
        // Extract query parameters from the request if available, otherwise fetch all reservations
        const queryParams: ReservationQueryParams[] = req.body.queryParams || []; // Assuming the query parameters are sent in the body

        const response = await fetchReservationsFunction(queryParams);
        
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reservations' }); // Respond with 500 status code and error message
    }
};
export const webhook = async (req: Request, res: Response) => {
    // Print the received event to the console
    console.log(JSON.stringify(req.body, null, 2));
    const reservations = req.body.data.result.map((res: any) => ({
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
    reservations.forEach(async(reservation:any) => {
        const newReservation = new Reservation(reservation);
        await newReservation.save();    
    });

    res.status(200).send('Event received');
};
