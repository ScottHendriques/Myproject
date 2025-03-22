import express from 'express';
import { cargoData, getTopDestinations } from '../controllers/cargo.controller.js';
import { getRecentBookings } from '../controllers/cargo.controller.js'; 
import { getTopProducts } from "../controllers/cargo.controller.js";

const router = express.Router();

router.post('/cargo/:userId', cargoData);
router.get("/recent/:userId", getRecentBookings);
router.get("/top-products/:userId", getTopProducts);
router.get("/top-destinations/:userId", getTopDestinations);

export default router;