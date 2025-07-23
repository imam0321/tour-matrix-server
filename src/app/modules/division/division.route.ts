import { Router } from "express";
import { DivisionController } from "./division.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import {
  createDivisionSchema,
  updateDivisionSchema,
} from "./division.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.post(
  "/create",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  multerUpload.single("file"),
  validateRequest(createDivisionSchema),
  DivisionController.createDivision
);
router.get("/", DivisionController.getAllDivision);
router.get("/:slug", DivisionController.getSingleDivision);
router.patch(
  "/:id",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  multerUpload.single("file"),
  validateRequest(updateDivisionSchema),
  DivisionController.updateDivision
);
router.delete(
  "/:id",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  DivisionController.deleteDivision
);

export const DivisionRoutes = router;
