import express from  "express"
const app = express()
const port = 4000
import carsRouter from './cars/cars.js'

app.use(express.json())

app.get('/', (req, res) => {
   res.send('Hello from the Cards API!')
})


app.use('/api/v1/cars', carsRouter)



app.listen(port, () => {
   console.log(`Server is running on port http://localhost:${port}`)
})