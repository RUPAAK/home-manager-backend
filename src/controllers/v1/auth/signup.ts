/**
 * * CHECKS IF USER ALREADY EXISTS
 * * CHECK IF USER ROLE EXISTS
 * * ASSIGN USER ROLE FOR EVERY SIGNUP
 */

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../../../common";
import { Role } from "../../../models/role";
import { User } from "../../../models/user";

const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError("Email in use");
  }

  // Check role in database if it exisits - Initially Role should be user
  let roleForUser = await Role.findOne({ name: "user" });

  if (!roleForUser) {
    // Create a role with user
    const buildRoleForUser = Role.build({
      name: "user",
      resources: [
        {
          name: "auth",
          access: ["GET", "POST", "DELETE", "PATCH"],
          isUser: true,
          limitedField: [],
        },
      ],
    });

    roleForUser = await buildRoleForUser.save();
  }

  const user = User.build({ email, password, name, role: roleForUser.id });

  const createdUser = await user.save();

  const populatedUser = await createdUser.populate("role").execPopulate();

  // Generate JWT
  // TODO: - Get Token Expiration Time From Env Var
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!,
    {
      expiresIn: "30d",
    }
  );

  res.status(201).send({
    accessToken: userJwt,
    data: populatedUser,
  });
};

export { signup as signupHandler };
