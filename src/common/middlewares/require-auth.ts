import { NotAuthorizedError } from "./../errors/not-authorized-error";
import { Request, Response, NextFunction } from "express";
import { User } from "../../models/user";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  // 2) Check if user still exists
  const existUserData = await User.findById(req.currentUser.id);

  if (!existUserData) {
    throw new NotAuthorizedError();
  }

  req.userData = existUserData;

  next();
};
