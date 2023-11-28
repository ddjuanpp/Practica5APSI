//@ts-ignore //
import { Request, Response } from "npm:express@4.18.2";
import { RestaurantModel } from "../db/restaurant.ts";


const createRestaurant = async (req: Request, res: Response) => {
    try {
        const { name, CIF, address } = req.body;
        const newRestaurant = new RestaurantModel({ name, CIF, address });
        await newRestaurant.save();
        res.status(200).send({
            name: newRestaurant.name,
            CIF: newRestaurant.CIF,
            address: newRestaurant.address,
            id: newRestaurant._id.toString(),
        });
    } catch (error) {
        res.status(404).json(error).send();
        return;
    }
  };
  
  export default createRestaurant;