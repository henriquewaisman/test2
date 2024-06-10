import { Request, Response } from "express";
import UserDataBaseService from "../services/UserBankService";
import { generateHash } from "../utils/BcryptUtils";

class UserController {
  constructor() {}

  async listUser(req: Request, res: Response) {
    try {
      const users = await UserDataBaseService.listUserBank();
      res.json({
        status: "ok",
        users: users,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async createUser(req: Request, res: Response) {
    const body = req.body;
    console.log(body);

    if (!body.email || !body.name || !body.password) {
      res.json({
        status: "error",
        message: "no parameters",
      });
      return;
    }

    const hashPassword = await generateHash(body.password);

    if(!hashPassword){
      res.json({
        status: "error",
        message: "Error: Couldn't encypt password",
      });
    }

    try {
      const newuser = await UserDataBaseService.insertUserBank({
        name: body.name,
        email: body.email,
        password: hashPassword as string
      });
      res.json({
        status: "ok",
        newuser: newuser,
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: "error",
        message: "no ID",
      });
    }

    const { name, email } = req.body;
    if (!email || !name) {
      res.json({
        status: "error",
        message: "no Parameters",
      });
    }

    try {
      const updatedUser = await UserDataBaseService.updateUserBank(
        {
          name: name,
          email: email,
        },
        parseInt(id)
      );
      res.json({
        status: "ok",
        newuser: updatedUser,
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: "error",
        message: "no ID",
      });
    }

    try {
      const response = await UserDataBaseService.deleteUserBank(parseInt(id));
      if (response) {
        res.json({
          status: "ok",
          message: "User Deleted",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        message: error,
      });
    }
  }
}

export default new UserController();