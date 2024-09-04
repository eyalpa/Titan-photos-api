// src/types/index.ts
export interface ReservationQueryParams {
    limit?: number;
    offset?: number;
    sortOrder?: string;
    channelId?: number;
    listingId?: number;
    assigneeUserId?: number;
    match?: string;
    arrivalStartDate?: string; // Use ISO string format for dates
    arrivalEndDate?: string;
    departureStartDate?: string;
    departureEndDate?: string;
    hasUnreadConversationMessages?: boolean;
    isStarred?: boolean;
    isArchived?: boolean;
    isPinned?: boolean;
    customerUserId?: string;
    includeResources?: number;
    latestActivityStart?: string;
    latestActivityEnd?: string;
    reservationAgreement?: string;
    guestEmail?: string;
}

// Define the expected structure of the reservation data
export interface Reservation {
    id: number;
    checkIn: string;  // Date in ISO format
    checkOut: string; // Date in ISO format
    price: number;
    created_at: string; // Date in ISO format
    guest_name: string;
    listingId: number;
    status: string;
    channel_name: string;
}

// Update ReservationResponse to reflect the actual structure
export interface ReservationResponse {
    reservations: Reservation[];
    totalCount: number;
}
