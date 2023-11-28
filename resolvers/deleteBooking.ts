//@ts-ignore //
import { Request, Response } from "npm:express@4.18.2";
import { BookingModel } from "../db/booking.ts";

const deleteBooking = async (req: Request, res: Response) => {
    try{
        const {id} = req.params.id;
        const booking = await BookingModel.findOneAndDelete({id}).exec();
        if(!booking){
            res.status(404).send("Booking no existe");
            return;
        }

        res.status(200).send("Booking borrado con exito");
    }catch(error){
        res.status(500).send({
            code: "error",
            message: error.message
        });
        return;
    }
}
export default deleteBooking;