import 'dotenv/config'
import express from "express";
import carsRouter from './routes/cars.js'

const app = express();
const PORT = process.env.PORT

app.use(express.json());

app.use((req, res, next) => {
	const timestamp = new Date().toISOString();
	console.log(`[${timestamp}] ${req.method} ${req.url}`);
	next();
});

app.get("/", (req, res) => {
	res.send("Hello from Car API!");
});

app.use("/api/v1", carsRouter);

app.use((err, req, res, next) => {
	console.error("Error:", err.message);
	res.status(500).json({
		error: "Something went wrong!",
		message: err.message,
	});
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
