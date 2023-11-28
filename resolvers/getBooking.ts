//@ts-ignore //
import { Request, Response } from "npm:express@4.18.2";
import { BookingModel } from "../db/booking.ts";
import { ClientModel } from "../db/client.ts";
import { RestaurantModel } from "../db/restaurant.ts";

const getBooking = async (req: Request, res: Response) => {
    try{
        const { id } = req.params.id;
        const booking = await BookingModel.findOne({ id }).exec(); 
        if(!booking){
            res.status(404).send({
                code: "error booking",
                message: "Booking no existe"
              });
            return;
        }
        const date = booking.date;
        const cliente = await ClientModel.findOne({ _id: booking.clientID }).exec();
        if (!cliente) {
            res.status(404).send({
                code: "error client",
                message: "Cliente no existe"
            });
            return;
        }
        const restaurante = await RestaurantModel.findOne({ _id: booking.restaurantID }).exec();
        if (!restaurante) {
            res.status(404).send({
                code: "error restaurant",
                message: "Restaurante no existe"
            });
            return;
        }
        
        res.status(200).send(
            {
                date,
                cliente: cliente.firstName + " " + cliente.lastName,
                restaurante: restaurante.name,
                id: booking._id.toString(),
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
export default getBooking;