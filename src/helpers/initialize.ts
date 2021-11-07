/**
 * * CREATE / UPDATE SUPERADMIN ROLE
 */

import mongoose, { Error } from "mongoose";
import { BadRequestError } from "../common";
import { Role, RoleAttrs } from "../models/role";
import { User } from "../models/user";

const initialize = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    const resources: any = [];

    // After Connection Check Roles to resources
    const collections = await mongoose.connection.db.collections();

    for (const collection of collections) {
      // Extract Roles
      console.log(collection.collectionName);

      resources.push({
        name: collection.collectionName,
        access: ["GET", "POST", "DELETE", "PATCH"],
        limitedFields: [],
      });
    }

    // Check Superadmin Role
    const existingRole = await Role.findOne({ name: "superadmin" });

    let adminRoleId: any;
    if (existingRole) {
      adminRoleId = existingRole.id;
      // Role Already Exist
      existingRole.resources = resources;
      await existingRole.save();
    } else {
      console.log("Superadmin do not exist");
      const superAdmin = Role.build({
        name: "superadmin",
        resources,
      });

      const createdAdmin = await superAdmin.save();
      adminRoleId = createdAdmin.id;
    }

    // Check For SuperAdmin User
    const adminExist = await User.findOne({
      email: process.env.SUPERADMIN_EMAIL,
    });

    if (adminExist) {
      adminExist.role = adminRoleId;

      await adminExist.save();
    } else {
      const adminUserCreation = User.build({
        name: "Super Admin",
        email: process.env.SUPERADMIN_EMAIL!,
        password: process.env.SUPERADMIN_PASSWORD,
        role: adminRoleId,
      });

      await adminUserCreation.save();
    }

    console.log("Connected to MongoDb");
  } catch (error) {
    throw new BadRequestError("error");
  }
};

export { initialize };
