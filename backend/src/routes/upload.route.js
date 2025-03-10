import express from 'express';
import { uploadFile } from '../controllers/upload.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/upload/:userId', uploadFile);


export default router;