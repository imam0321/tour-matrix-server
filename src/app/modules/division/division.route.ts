import { Router } from "express";
import { DivisionControllers } from "./division.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import {
  createDivisionSchema,
  updateDivisionSchema,
} from "./division.validation";
import { validateRequest } from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/create",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  validateRequest(createDivisionSchema),
  DivisionControllers.createDivision
);
router.get("/", DivisionControllers.getAllDivision);
router.get("/:slug", DivisionControllers.getSingleDivision);
router.patch(
  "/:id",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  validateRequest(updateDivisionSchema),
  DivisionControllers.updateDivision
);
router.delete(
  "/:id",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  DivisionControllers.deleteDivision
);

export const DivisionRoutes = router;
