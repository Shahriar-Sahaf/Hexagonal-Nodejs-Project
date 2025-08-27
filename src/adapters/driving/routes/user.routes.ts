import express from "express";
import { authService } from "../../../core/application/auth.service.js";
import { authController } from "../../../adapters/driving/controllers/auth.controller.js";
import { drivenPg } from "../../../adapters/driven/pg.repository.js";

// User Dependency Injection
const drivingObject = new drivenPg();
const authServiceObject = new authService(drivingObject);
const authControllerObject = new authController(authServiceObject);

const router = express.Router();
//User Routes
router.post("/login", (req, res) =>
  authControllerObject.loginOrRegister(req, res)
);
router.delete("/logout", (req, res) => authControllerObject.logout(req, res));
router.get("/users", (req, res) => authControllerObject.getAllUsers(req, res));

export default router;
