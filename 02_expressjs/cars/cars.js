import express from "express"
const router = express.Router()

const cars = [
   {
      id: 1,
      make: "BMW",
      model: "Lorem ipsum",
      year: "2020",
      price: "30000"
   },
   {
      id: 2,
      make: "Ferrari",
      model: "Lorem ipsum",
      year: "2019",
      price: "25300"
   },
   {
      id: 3,
      make: "Volvo",
      model: "Lorem ipsum",
      year: "2003",
      price: "10000"
   }
]



// READ (all the cars)
router.get('/', (req, res) => {
   res.json(cars)
})

// CREATE
router.post('/', (req, res) => {
   const { make, model, year, price } = req.body
   if(!make || !model || !year || !price) {
      return res.status(404).send("Missing fields")
   }
   const newCar = {
      id: cars.length + 1,
      make,
      model,
      year: Number(year),
      price: Number(price)
   }
   cars.push(newCar)
   res.json(cars)
})

// DELETE
router.delete('/:id', (req, res) => {
   const id = Number(req.params.id)
   const car = cars.find((car) => car.id === id)
   if (!car) return res.status(404).send('Car not found')
   const remainingCars = cars.filter(({ id }) => id !== car.id)
   res.json(remainingCars)
})

// UPDATE - Dynamic Route
router.put('/:id', (req, res) => {
   const carId = Number(req.params.id)
   const car = cars.find((car) => car.id === carId)
   const { id, make, model, year, price } = req.body
   if (!car) return res.status(404).send('Car not found')

   const newCars = cars.map((car) =>
      car.id === carId
         ? { id: id ?? car.id, make: make ?? car.make, model: model ?? car.model, year: year ?? car.year, price: price ?? car.price }
         : car
   )
   res.json(newCars)
})

// Read a specific car
router.get('/:id', (req, res) => {
   const id = Number(req.params.id)
   const car = cars.find((car) => car.id === id)
   if (!car) return res.status(404).send('Car not found')
   res.status(200).json(car)
})

export default router