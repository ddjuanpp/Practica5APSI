import mongoose from "npm:mongoose@8.0.1"; 
import { Booking } from "../types.ts";
import { ClientModel } from "./client.ts";
import { RestaurantModel } from "./restaurant.ts";

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    date: {type: Date, required: false},
    clientID: {type: mongoose.Schema.ObjectId, required: true, ref: "Client"},
    restaurantID: {type: mongoose.Schema.ObjectId, required: true, ref: "Restaurant"},
},{
    timestamps: true
});

BookingSchema.pre('save', function(next) {//pre save
    console.log('Se va a guardar una nueva reserva.');
    next();
});

BookingSchema.post('save', function() {//post save
    console.log('Se ha guardado una nueva reserva.');
    ClientModel.updateOne({ _id: this.clientID }, { $push: { bookings: this._id } }).exec();
    RestaurantModel.updateOne({ _id: this.restaurantID }, { $push: { bookings: this._id } }).exec();
});

BookingSchema.pre('findOne', function(next) {//pre findOne
    console.log('Se va a buscar una reserva.');
    next();
});

BookingSchema.post('findOne', function(booking) {//post findOne
    if(!booking){
        console.log('No hay ninguna reserva con ese id.');
        return;
    }
    console.log('Se ha buscado una reserva.');
});

BookingSchema.pre('findOneAndDelete', function(next) {//pre findOneAndDelete
    console.log('Se va a borrar una reserva.');
    next();
});

BookingSchema.post('findOneAndDelete', function(booking) {//post findOneAndDelete
    if(!booking){
        console.log('No hay ninguna reserva con ese id.');
        return;
    }
    const bookingAux = booking as BookingSchemaType;
    ClientModel.updateOne({ _id: bookingAux.clientID }, { $pull: { bookings: bookingAux._id } }).exec();
    RestaurantModel.updateOne({ _id: bookingAux.restaurantID }, { $pull: { bookings: bookingAux._id } }).exec();
    console.log('Se ha borrado una reserva.');
});

BookingSchema.pre('find', function(next) {//pre find
    console.log('Se va a buscar una reserva.');
    next();
});

BookingSchema.post('find', function() {//post find
    console.log('Se ha buscado una reserva.');
});

BookingSchema.pre('deleteMany', function(next) {//pre deleteMany
    console.log('Se van a borrar las reservas.');
    next();
});

BookingSchema.post('deleteMany', function() {//post deleteMany
    console.log('Se han borrado las reservas.');
});

export type BookingSchemaType = mongoose.Document & Omit<Booking, "id">;

export const BookingModel = mongoose.model<BookingSchemaType>("Booking", BookingSchema);