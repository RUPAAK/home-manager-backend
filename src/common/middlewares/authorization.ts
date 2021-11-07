import { Request, Response, NextFunction } from "express";
import { ForbiddenError, NotAuthorizedError } from "..";
import { Role } from "../../models/role";
import { User } from "../../models/user";
const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   if (req.currentUser!.isTemporary) {
  //     if (req.originalUrl === "/api/v1/admin/login2factorverify") {
  //       return next();
  //     } else {
  //     }
  //   }

  const url = req.originalUrl.split("/");
  const resource = url[3].split("?").shift();

  const userId = req.currentUser!.id;
  const savedUser = await User.findById(userId);
  const userRole = savedUser!.role;
  // Get Role from database - Check Access
  const savedRole = await Role.findById(userRole);
  if (!savedRole) {
    throw new NotAuthorizedError();
  }
  const currentLimit = savedRole.resources.find(
    (eachRes) => eachRes.name == resource
  );
  req.limitedField = currentLimit!.limitedField;
  req.isUser = currentLimit!.isUser;

  // For Admin Dashboard: If User has access to users collection give him access to admin dashboard data as well
  if (resource === "admin") {
    if (savedRole.resources.map((eachRes) => eachRes.name).includes("users")) {
      // Give that user access
      return next();
    } else {
      throw new ForbiddenError();
    }
  }
  const extractedResource = savedRole.resources.find(
    (res) => res.name === resource
  );
  if (!extractedResource) {
    throw new NotAuthorizedError();
  }
  if (!extractedResource.access.includes(req.method)) {
    throw new NotAuthorizedError();
  }
  next();
};
export { authorization };
