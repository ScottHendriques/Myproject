import express from 'express';
import {
  getAdminRecentShipments,
  getAdminTopCargoTypes,
  getAdminTopRoutes,
  getAdminTotalShipments,
} from '../controllers/admin.controller.js';
import { protectRoute, adminOnly } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/admin/recent', protectRoute, adminOnly, getAdminRecentShipments);
router.get('/admin/top-cargo', protectRoute, adminOnly, getAdminTopCargoTypes);
router.get('/admin/top-routes', protectRoute, adminOnly, getAdminTopRoutes);
router.get('/admin/total-shipments', protectRoute, adminOnly, getAdminTotalShipments);

export default router;