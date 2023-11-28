//@ts-ignore //
import { Request, Response } from "npm:express@4.18.2";
import { ClientModel } from "../db/client.ts";
import { BookingModel } from "../db/booking.ts";
import { RestaurantModel } from "../db/restaurant.ts";

const getClient = async (req: Request, res: Response) => {
    try{
        const { id } = req.params.id;
        const client = await ClientModel.findOne({ id }).exec(); 
        if(!client){
            res.status(404).send({
                code: "error client",
                message: "Cliente no existe"
              });
            return;
        }
        const firstName = client.firstName;
        const lastName = client.lastName;
        const email = client.email;
        const phoneNumber = client.phoneNumber;
        const DNI = client.DNI;
        const bookings = await BookingModel.findOne({ clientID: client._id }).exec();
        let nameRestaurant = " ";
        if(bookings){
            const restaurant = await RestaurantModel.findOne({ _id: bookings.restaurantID }).exec();
            if(restaurant){
                nameRestaurant = restaurant.name;
            }
        }
        
        res.status(200).send(
            {
                id,
                firstName,
                lastName,
                email,
                phoneNumber,
                DNI,
                bookings: nameRestaurant
            }
        );

    }catch(error){
        res.status(500).send({
            code: "error",
            message: error.message
          });
        return;
    }
}
export default getClient;