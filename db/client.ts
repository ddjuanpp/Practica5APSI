import mongoose from "npm:mongoose@8.0.1";
import { Client } from "../types.ts";

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type:String, required: true, unique: true},
    phoneNumber: {type:Number, required: true},
    DNI: {type:String, required: true, unique: true},
    bookings: [{type: mongoose.Schema.ObjectId, required: true, ref: "Booking", default: []}]
},{
    timestamps: true
});

ClientSchema.pre('save', function(next) {//pre save
    console.log('Se va a guardar un nuevo cliente.');
    next();
});

ClientSchema.post('save', function() {//post save
    console.log('Se ha guardado un nuevo cliente.');
});

ClientSchema.pre('findOne', function(next) {//pre findOne
    console.log('Se va a buscar un cliente.');
    next();
});

ClientSchema.post('findOne', function(client) {//post findOne
    if(!client){
        console.log('No hay ningun cliente con ese id.');
        return;
    }
    console.log('Se ha buscado un cliente.');
});

ClientSchema.pre('updateOne', function(next) {//pre updateOne
    console.log('Se va a actualizar un cliente.');
    next();
});

ClientSchema.post('updateOne', function() {//post updateOne
    console.log('Se ha actualizado un cliente.');
});

ClientSchema.pre('updateMany', function(next) {//pre updateMany
    console.log('Se van a actualizar los clientes.');
    next();
});

ClientSchema.post('updateMany', function() {//post updateMany
    console.log('Se han actualizado los clientes.');
});

ClientSchema.path("email").validate((email: string) => {
    return /\w+@\w+.[a-zA-Z]/.test(email); // \w es para las cadenas: a-z, A-Z, 0-9 y _ 
})

ClientSchema.path("phoneNumber").validate((phoneNumber: number) => {
    if(phoneNumber.toString().length !== 9){
        return false;
    }
    return true;
})
ClientSchema.path("DNI").validate((DNI: string) => {
    return /\d{8}[A-Z]/.test(DNI); // \d es lo mismo que: 0-9 y el {8} es para que hayan 8 de lo anterior en este caso numeros
})


export type ClientSchemaType = mongoose.Document & Omit<Client, "id">;

export const ClientModel = mongoose.model<ClientSchemaType>("Client", ClientSchema);
