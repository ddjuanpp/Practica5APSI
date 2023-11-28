//@ts-ignore //
import { Request, Response } from "npm:express@4.18.2";
import { BookingModel } from "../db/booking.ts";
import { ClientModel } from "../db/client.ts";
import { RestaurantModel } from "../db/restaurant.ts";


const createBooking = async (req: Request, res: Response) => {
    try {
        const { clientID, restaurantID } = req.body;
        const { date } = req.body;
        const cliente = await ClientModel.findOne({ _id: clientID }).exec()
        const restaurante = await RestaurantModel.findOne({ _id: restaurantID }).exec()
        if(!cliente){
            res.status(404).send({
                code: "error client",
                message: "Cliente no existe"
            });
            return;
        }
        else if(!restaurante){
            res.status(404).send({
                code: "error restaurant",
                message: "Restaurante no existe"
            });
            return;
        }
        
        const dateaux = date || new Date(); //Si no se especifica la fecha, se toma la actual
        const newBooking = new BookingModel({ clientID, restaurantID, date: dateaux });
        await newBooking.save();

        res.status(200).send({
            date: newBooking.date,
            cliente: cliente.firstName + " " + cliente.lastName,
            restaurante: restaurante.name,
            id: newBooking._id.toString(),
        });
    } catch (error) {
        res.status(404).json(error).send();
        return;
    }
  };
  
  export default createBooking;