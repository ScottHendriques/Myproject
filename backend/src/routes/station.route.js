import express from "express";
import { getCountries, getStates, getStation, createStation,} from "../controllers/station.controller.js";

const router = express.Router();

router.get("/stations/countries", getCountries);
router.get("/stations/states", getStates);
router.get("/stations", getStation);
router.post("/stations", createStation);
// router.get("/stations/all", getAllStations);


export default router;