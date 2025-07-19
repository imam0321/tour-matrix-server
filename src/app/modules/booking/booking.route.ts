import { Router } from "express";
import { BookingController } from "./booking.controller";

const router = Router();

router.post("/create", BookingController.createBooking);

export const BookingRoutes = router;
