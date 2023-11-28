//@ts-ignore //
import { Request, Response } from "npm:express@4.18.2";
import { RestaurantModel } from "../db/restaurant.ts";
import { BookingModel } from "../db/booking.ts";
import { ClientModel } from "../db/client.ts";

const getRestaurant = async (req: Request, res: Response) => {
    try{
        const { id } = req.params.id;
        const restaurant = await RestaurantModel.findOne({ id }).exec(); 
        if(!restaurant){
            res.status(404).send({
                code: "error restaurant",
                message: "Restaurante no existe"
              });
            return;
        }
        const name = restaurant.name;
        const CIF = restaurant.CIF;
        const address = restaurant.address;
        const bookings = await BookingModel.findOne({ restaurantID: restaurant._id }).exec();
        let nameClient = " ";
        if(bookings){
            const client = await ClientModel.findOne({ _id: bookings.clientID }).exec();
            if(client){
                nameClient = client.firstName + " " + client.lastName;
            }
        }

        res.status(200).send(
            {
                id,
                name,
                CIF,
                address,
                bookings: nameClient
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
export default getRestaurant;