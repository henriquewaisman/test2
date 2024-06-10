import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { generateHash } from "../utils/BcryptUtils";


class AuthController {
    constructor() { }

    async signUp(req: Request, res: Response) {
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

        if (!hashPassword) {
            res.json({
                status: "error",
                message: "Error: couldn't encrypt password",
            });
        }

        try {
            const newuser = await AuthService.signUp({
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

    async signIn() {

    }

    async signOut() {

    }
}
export default new AuthController();