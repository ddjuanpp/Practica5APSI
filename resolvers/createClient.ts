//@ts-ignore //
import { Request, Response } from "npm:express@4.18.2";
import { ClientModel } from "../db/client.ts";


const createClient = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, phoneNumber, DNI } = req.body;
        const newClient = new ClientModel({ firstName, lastName, email, phoneNumber, DNI });
        await newClient.save();
        res.status(200).send({
            firstName: newClient.firstName,
            lastName: newClient.lastName,
            email: newClient.email,
            phoneNumber: newClient.phoneNumber,
            DNI: newClient.DNI,
            id: newClient._id.toString(),
        });
    } catch (error) {
        res.status(404).json(error).send();
        return;
    }
  };
  
  export default createClient;