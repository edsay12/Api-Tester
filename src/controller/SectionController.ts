import { Request, Response, NextFunction } from "express";
import validator from "validator";
import { UserModel } from "../models/userModel";
import { StatusCodes } from "http-status-codes";
import { UserType } from "../../src/types/User";
import * as jsonwebtoken from "jsonwebtoken";
import { where } from "sequelize";

class SectionController {
  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;
    console.log(req.body);

    //validations -----------------------------------------------------------------
    if (!validator.isEmail(email))
      return res.sendStatus(StatusCodes.BAD_REQUEST);

    if (!password)
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: true,
        message: "Password cant be null",
      });

    if (password.length < 8)
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: true,
        message: "password must have 8 or more caracters",
      });

    //- validations ---------------------------------------------------------------
      try{
        const user: any = await UserModel.create({
          name: name,
          email: email,
          password: password,
        });
    
        if (user)
          return res.status(StatusCodes.OK).send({
            id: user.id,
            name: user.name,
            email: email,
          });
        
      }catch(e){

        return res.status(StatusCodes.BAD_REQUEST).json({
          error: true,
          message: "email already exists"
        });

      }
    
  }

  async login(req: Request, res: Response) {
    const CompareUser: UserType = req.body;
    console.log(req.body);
    if (!CompareUser) return res.status(StatusCodes.BAD_REQUEST);
    try {
      const user: UserType | any = await UserModel.findOne({
        where: { email: CompareUser.email },
      });
      console.log(user.dataValues.password);

      if (user.length === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: true,
          message: "user or password don't exists",
        });
      }
      // return res.send(user[0].password);
      try {
        const inputPassword = CompareUser.password;
        const userPassword = user.dataValues.password;
        const match = inputPassword === userPassword;
        if (!match) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            error: true,
            message: "user or password don't exists",
          });
        }

        const userInformations = user.dataValues;
        const payload = {
          userId: userInformations._id,
          userImage: userInformations.name,
          userName: userInformations.password,
        };

        const secret: string | any = process.env.SECRET_KEY;
        if (!secret) return "";
        const options = {
          expiresIn: "5d", // aqui eu seto a expiração de 5 dias
        };

        const jwt = jsonwebtoken.sign(payload, secret, options);

        // localStorage.setItem('token',jwt)

        return res.status(StatusCodes.ACCEPTED).json({
          error: false,
          message: "sucess",
          token: jwt,
        });
      } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: true,
          message: "Login ou senha incorretos",
        });
      }
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: true,
        message: "Login ou senha incorretos",
      });
    }
    return "";
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    if (!req.params.userId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: true,
        message: "Send one id",
      });
    }

    try {
      const userDb = await UserModel.findOne({
        where: {
          id: req.params.userId,
        },
      });
      if (!userDb) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: true,
          message: "user dont exist",
        });
      }
    } catch (e) {
      return res.status(StatusCodes.BAD_GATEWAY).json({
        error: true,
        message: "user dont exist",
      });
    }

    try {
      let user: UserType = req.body;
      if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: true,
          message: "null fields",
        });
      }

      try {
        await UserModel.update(
          {
            name: user.name,
            email: user.email,
          },
          {
            where: {
              id: req.params.userId,
            },
            returning: true,
          }
        );
        console.log("usuario atualizado com sucesso");
      } catch (e) {
        return res.status(StatusCodes.BAD_GATEWAY).json({
          error: true,
          message: "erro no update",
        });
      }

      return res.status(StatusCodes.CREATED).json({
        error: false,
        id: user.id,
        email: user.email,
        name: user.name,
      });
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.BAD_GATEWAY).json({
        error: true,
        message: "Database Error",
      });
    }
  }

  async removeUser(req: Request, res: Response): Promise<Response> {
    if (!req.params.userId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: true,
        message: "Send one id",
      });
    }
    try {
      const user = await UserModel.findOne({
        where: { id: req.params.userId },
      });
      if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: true,
          message: "user dont exist",
        });
      }
      await UserModel.destroy({ where: { id: req.params.userId } });

      return res.status(StatusCodes.OK).json({
        error: false,
        message: "Sucess",
      });
    } catch (error) {
      return res.status(StatusCodes.BAD_GATEWAY).json({
        error: true,
        message: "Database Error",
      });
    }
  }
}

export default new SectionController();
