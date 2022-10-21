import { Request, Response, NextFunction } from "express";
import validator from "validator";
import { UserModel } from "../models/userModel";
import {StatusCodes} from 'http-status-codes'


class SectionController {
   async store(req: Request, res: Response) {
    const {name,email,password} = req.body
    console.log(req.body)

    if(!validator.isEmail(email)) return res.sendStatus(StatusCodes.BAD_REQUEST);
    
    const user: any = await UserModel.create({
      name: name,
      email: email,
      password: password,
    });
    if(user) return res.sendStatus(200)
  }
}

export default new SectionController();
