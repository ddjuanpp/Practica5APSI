import mongoose from "npm:mongoose@8.0.1";
import { Restaurant } from "../types.ts";
import { BookingModel } from "./booking.ts";
import { ClientModel } from "./client.ts";

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    name: {type: String, required: true, unique: true},
    CIF: {type: String, required: true, unique: true},
    address: {type: String, required: true},
    bookings: [{type: mongoose.Schema.ObjectId, required: true, ref: "Booking", default: []}]
},{
    timestamps: true
})

RestaurantSchema.pre('save', function(next) {//pre save
    console.log('Se va a guardar un nuevo restaurante.');
    next();
});

RestaurantSchema.post('save', function() {//post save
    console.log('Se ha guardado un nuevo restaurante.');
});

RestaurantSchema.pre('findOne', function(next) {//pre findOne
    console.log('Se va a buscar un restaurante.');
    next();
});

RestaurantSchema.post('findOne', function(restaurant) {//post findOne
    if(!restaurant){
        console.log('No hay ningun restaurante con ese id.');
        return;
    }
    console.log('Se ha buscado un restaurante.');
});

RestaurantSchema.pre('deleteMany', function(next) {//pre deleteMany
    console.log('Se van a borrar los restaurantes.');
    next();
});

RestaurantSchema.post('deleteMany', async function() {//post deleteMany
    await BookingModel.deleteMany().exec();//se borran todas las reservas de los restaurantes
        //se borran todas las reservas de los clientes
    await ClientModel.updateMany(
        {},
        {$set: { bookings: [] } },
        {new: true }
    ).exec();
    console.log('Se han borrado los restaurantes.');
});

RestaurantSchema.pre('findOneAndDelete', function(next) {//pre findOneAndDelete
    console.log('Se va a borrar un restaurante.');
    next();
});

RestaurantSchema.post('findOneAndDelete', async function(restaurant) {//post findOneAndDelete
    if(!restaurant){
        console.log('No hay ningun restaurante con ese id.');
        return;
    }
    const bookings = await BookingModel.find({restaurantID: restaurant._id}).exec();
    if(bookings){//Si hay bookings para ese restaurante se borran de los clientes 
        for(let i = 0; i < bookings.length; i++){
            const clientID = bookings[i].clientID;
            await ClientModel.updateOne(
                {id: clientID},
                {$pull: { bookings: bookings[i]._id } },
                {new: true }
            ).exec();
        }
    }
    await BookingModel.deleteMany({restaurantID: restaurant._id}).exec(); //se borran los bookings que tengan de restaurantID el id del restaurante
    console.log('Se ha borrado un restaurante.');
});

RestaurantSchema.pre('updateOne', function(next) {//pre updateOne
    console.log('Se va a actualizar un restaurante.');
    next();
});

RestaurantSchema.post('updateOne', function() {//post updateOne
    console.log('Se ha actualizado un restaurante.');
});

RestaurantSchema.path("CIF").validate((CIF: string) => {
    return /[A-Z]\d{8}/.test(CIF);
})

export type RestaurantSchemaType = mongoose.Document & Omit<Restaurant, "id">;

export const RestaurantModel = mongoose.model<RestaurantSchemaType>("Restaurant", RestaurantSchema);
