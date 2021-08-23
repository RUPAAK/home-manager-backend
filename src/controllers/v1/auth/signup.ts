import { Request, Response } from "express";
import { BadRequestError } from "../../../common";
import { User } from "../../../models/user";
import { Role } from "../../../common/types/auth_types";

const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError("Email already in use !!");
  }

    const user= User.build({name, email, password, role: Role.User})

    const createdUser= await user.save()
    res.status(201).send({
        data: createdUser
    })
};

export { signup as signupHandler };
