import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@8.0.1";

import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts"
import createBooking from "./resolvers/createBooking.ts";
import createRestaurant from "./resolvers/createRestaurant.ts";
import createClient from "./resolvers/createClient.ts";
import deleteRestaurants from "./resolvers/deleteRestaurants.ts";
import deleteRestaurant from "./resolvers/deleteRestaurant.ts";
import deleteBooking from "./resolvers/deleteBooking.ts";
import getClient from "./resolvers/getClient.ts";
import getRestaurant from "./resolvers/getRestaurant.ts";
import getBooking from "./resolvers/getBooking.ts";


const env = await load();
const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if(!MONGO_URL){
  console.error("MONGO_URL is required");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());
//Como al final en clase con Alberto no se explico el middleware ya que dimos otra cosa, he hecho el middleware de la siguiente manera
//en las funciones como borrar, los post he hecho todo lo que conlleva esa funcion sobre los otros modelos
//antes de hacer el middleware, hice las funciones como hemos hecho siempre para comprobar que vaya bien, y luego los quite de ahi para ponerlos en los schemes
app
  .get("/client/:id", getClient)
  .get("/restaurant/:id", getRestaurant)
  .delete("/restaurant/:id", deleteRestaurant)
  .delete("/restaurant", deleteRestaurants)
  .post("/restaurant", createRestaurant)
  .post("/client", createClient)
  .post("/booking", createBooking)
  .get("/booking/:id", getBooking)
  .delete("/booking/:id", deleteBooking)

app.listen(3000, () => {
  console.info("Server running on port 3000");
});