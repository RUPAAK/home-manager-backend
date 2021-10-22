import crypto from "crypto";
import mongoose from "mongoose";
import { Role } from "../common/types/auth_types";

// An interface that describes the properties
// that are requried to create a new User
interface TransistionAttrs {
  name: string;
  amount: number;
  date?: string;
  user: string;
  bank: string;
  active?: boolean;
}

// An interface that describes the properties
// that a User Model has
interface TransistionModel extends mongoose.Model<TransistionDoc> {
  build(attrs: TransistionAttrs): TransistionDoc;
}

interface TransistionDoc extends mongoose.Document, TransistionAttrs {
  name: string;
  amount: number;
  date: string;
  user: string;
  bank: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
}

const transistionSchema = new mongoose.Schema<TransistionDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bank",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

transistionSchema.index({ name: "text" });

transistionSchema.statics.build = (attrs: TransistionAttrs) => {
  return new Transistion(attrs);
};

const Transistion = mongoose.model<TransistionDoc, TransistionModel>(
  "Transistion",
  transistionSchema
);

export { Transistion };
