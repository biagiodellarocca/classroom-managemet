import express from 'express'
import { db } from '../db.js'
import { cars } from "../schema.js";
import { eq } from 'drizzle-orm';

const carsRouter = express.Router()

// Get All Cars
carsRouter.get("/cars", async (req, res) => {
   const allCars = await db
      .select()
      .from(cars);

   res.json(allCars)
});

// Get A Car from ID
carsRouter.get("/cars/:id", async (req, res) => {
   const carId = Number(req.params.id);

   if (isNaN(carId)) {
      return res.status(400).json({ error: "Car ID invalid" });
   }

   const car = await db
      .select()
      .from(cars)
      .where(eq(cars.id, carId))

   if (car.length === 0) {
      return res.status(404).json({ error: "Car not found" });
   }

   res.json(car[0]);
});

// Post New Car
carsRouter.post("/cars", async (req, res) => {
   const { make, model, year, price } = req.body;

   if (!make || !model || !year || !price) {
      return res.status(400).json({
         error: "Please provide make, model, year, and price",
      });
   }

   const [newCar] = await db
      .insert(cars)
      .values({
         make,
         model,
         year,
         price
      })
      .returning()

   res.status(201).json(newCar[0]);
});

// Update A Car
carsRouter.put("/cars/:id", async (req, res) => {
   const carId = Number(req.params.id);

   if (isNaN(carId)) {
      return res.status(400).json({ error: "Car ID invalid" });
   }

   const { make, model, year, price } = req.body;

   const updatedCar = await db
      .update(cars)
      .set({
         make,
         model,
         year,
         price
      })
      .where(eq(cars.id, carId))
      .returning();

   if (updatedCar.length === 0) {
      return res.status(404).json({ error: "Car not found" });
   }

   res.json(updatedCar[0]);
});

// Delete A Car
carsRouter.delete("/cars/:id", async (req, res) => {
   const carId = Number(req.params.id);

   if (isNaN(carId)) {
      return res.status(400).json({ error: "Car ID invalid" });
   }

   const deletedCar = await db
      .delete(cars)
      .where(eq(cars.id, carId))
      .returning();

   if (deletedCar.length === 0) {
      return res.status(404).json({ error: "Car not found" });
   }

   res.json({
      message: "Car deleted successfully",
      car: deletedCar[0],
   });
});

export default carsRouter