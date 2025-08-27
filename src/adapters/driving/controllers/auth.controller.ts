import { IAuthServicePort } from "../../../core/ports/auth.service.port.js";
import type { Request, Response } from "express";

export class authController {
  constructor(private readonly authService: IAuthServicePort) {}

  async loginOrRegister(req: Request, res: Response) {
    try {
      const { idNumber, password } = req.body;
      const token = await this.authService.loginOrRegister(idNumber, password);
      res.status(200).json({ token });
    } catch (error) {
      const err = error as Error;
      res.status(401).json({ message: err.message });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const { idNumber } = req.body;
      await this.authService.remove(idNumber);
      res.status(200).json({ message: "User logged out successfully" });
    } catch (err) {
      throw new Error("Logout Failed");
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.authService.getAllUsers();
      res.status(200).json({ message: "Get Users Successfuly", users });
    } catch (error) {
      throw new Error("Cannot Get Users");
    }
  }
}
