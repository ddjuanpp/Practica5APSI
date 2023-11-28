export type Client = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    DNI: string;
    bookings: Booking[];
    id: string;
};

export type Restaurant = {
    name: string;
    CIF: string;
    address: string;
    bookings: Booking[];
    id: string;
};

export type Booking = {
    date: string;
    clientID: string;
    restaurantID: string;
}