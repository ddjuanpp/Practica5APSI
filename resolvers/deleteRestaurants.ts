//@ts-ignore //
import { Request, Response } from "npm:express@4.18.2";
import { RestaurantModel } from "../db/restaurant.ts";

const deleteRestaurants = async (_req: Request, res: Response) => {
    try{
        await RestaurantModel.deleteMany().exec();//se borran todos los restaurantes

        res.status(200).send("Restaurantes borrados con exito");

    }catch(error){
        res.status(500).send({
            code: "error",
            message: error.message
        });
        return;
    }
}
export default deleteRestaurants;