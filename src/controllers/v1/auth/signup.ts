import { Request, Response } from "express";
import { BadRequestError } from "../../../common";
import { User } from "../../../models/user";
import { Role } from "../../../common/types/auth_types";
import jwt from "jsonwebtoken";

const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError("Email already in use !!");
  }

    const user= User.build({name, email, password, role: Role.User})

    const createdUser= await user.save()
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );
  
    res.status(201).send({
      accessToken: userJwt,
        data: createdUser
    })
};

export { signup as signupHandler };
