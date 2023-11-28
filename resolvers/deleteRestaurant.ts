//@ts-ignore //
import { Request, Response } from "npm:express@4.18.2";
import { RestaurantModel } from "../db/restaurant.ts";

const deleteRestaurant = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const restaurant = await RestaurantModel.findOneAndDelete({id}).exec(); 
        if(!restaurant){
            res.status(404).send("Restaurante no existe");
            return;
        }

        res.status(200).send("Restaurante borrado con exito");
    }catch(error){
        res.status(500).send({
            code: "error",
            message: error.message
        });
        return;
    }
}
export default deleteRestaurant;