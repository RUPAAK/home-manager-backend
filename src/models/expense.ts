import crypto from "crypto";
import mongoose from "mongoose";
import { Role } from "../common/types/auth_types";

// An interface that describes the properties
// that are requried to create a new User
interface ExpenseAttrs {
  title: string;
  amount: number;
  date?: string;
}

// An interface that describes the properties
// that a User Model has
interface ExpenseModel extends mongoose.Model<ExpenseDoc> {
  build(attrs: ExpenseAttrs): ExpenseDoc;
}

interface ExpenseDoc extends mongoose.Document, ExpenseAttrs {
  title: string;
  amount: number;
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

const expenseSchema = new mongoose.Schema<ExpenseDoc>(
  {
    title: {
      type: String,
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

expenseSchema.statics.build = (attrs: ExpenseAttrs) => {
  return new Expense(attrs);
};

const Expense = mongoose.model<ExpenseDoc, ExpenseModel>(
  "Expense",
  expenseSchema
);

export { Expense };
