import { Router } from "express";
import { TourControllers } from "./tour.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post("/create", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), TourControllers.createTour);

export const TourRoutes = router;
