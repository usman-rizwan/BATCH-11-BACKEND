import express from "express";
import 'dotenv/config'
import eventRoutes from './routers/events.js'
import categoryRoutes from './routers/category.js'
import mongoose from "mongoose";
const app = express()

app.use(express.json())
const PORT = process.env.PORT

mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Mongodb Connected'))
    .catch((err) => console.log(err))

app.get('/', (req, res) => {
    res.send('HELLO WORLD')
})

app.use('/category', categoryRoutes)
// app.use('/event', eventRoutes)


app.listen(PORT, () => console.log("Server is running on PORT " + PORT))