import mongoose from "mongoose";

/**
 * TOTAL ROLE TYPE OF THE APP
 */
export enum RoleType {
  user = "user",
  admin = "admin",
  superadmin = "superadmin",
}

/**
 * INTERFACE THAT DEFINES FIELDS TO CREATE TOLE
 */

export interface RoleAttrs {
  name?: string;
  resources?: [name: string, access: string[]];
  limitedField?: string[];
}

/**
 * INTERFACE THAT DEFINES FIELDS A ROLE INSTANCE HAVE
 */

interface RoleModel extends mongoose.Model<RoleDoc> {
  build(attrs: RoleAttrs): RoleDoc;
}

interface RoleDoc extends mongoose.Document, RoleAttrs {
  name: string;
  resources: [name: string, access: string[]];
  limitedField: string[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const roleSchema = new mongoose.Schema<RoleDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    resources: [
      {
        name: String,
        access: [String],
      },
    ],
    limitedField: [
      {
        type: String,
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.id;
        delete ret.__V;
      },
    },
  }
);

roleSchema.statics.build = (attrs: RoleAttrs) => {
  return new Role(attrs);
};

const Role = mongoose.model<RoleDoc, RoleModel>("Role", roleSchema);

export { Role };
