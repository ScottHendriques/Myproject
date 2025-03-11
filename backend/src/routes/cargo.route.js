import express from 'express';
import { cargoData } from '../controllers/cargo.controller.js';

const router = express.Router();

router.post('/cargo/:userId', cargoData);


export default router;