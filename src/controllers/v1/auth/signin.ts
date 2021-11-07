/**
 * * CHECKS IF USER EXISTS IF FALSE RETURN 400
 * * CHECK PASSWORD IF FALSE RETURN 400
 * * RETURN DATA AND ACCESSTOKEN
 */

import { Request, Response } from "express";
import { BadRequestError } from "../../../common";
import { User } from "../../../models/user";
import { Password } from "../../../services/password";
import jwt from "jsonwebtoken";

const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existUser = await User.findOne({ email }).populate("role");

  const passwordMatch = await Password.compare(existUser!.password, password);

  if (!passwordMatch) throw new BadRequestError("Invalid Credientials");

  const userJwt = jwt.sign(
    {
      id: existUser!.id,
      email: existUser!.email,
    },
    process.env.JWT_KEY!,
    {
      expiresIn: "30d",
    }
  );

  res.status(200).send({
    accessToken: userJwt,
    data: existUser,
  });
};

export { signin as signinHandler };
