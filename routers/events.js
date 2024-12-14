
import express from "express";
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Event API CALLED')
})

export default router