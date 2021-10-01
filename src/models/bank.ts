import mongoose from "mongoose";

interface BankAttrs {
  name: string;
  amount: number;
  date: string;
  interest?: string;
  user: string;
}

interface BankModel extends mongoose.Model<BankDoc> {
  build(attrs: BankAttrs): BankDoc;
}

interface BankDoc extends mongoose.Document, BankAttrs {
  name: string;
  amount: number;
  date: string;
  interest: string;
  user: string;
}

const bankSchema = new mongoose.Schema<BankDoc>(
  {
    name: {
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    interest: {
      type: String,
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

bankSchema.index({ name: "text" });

bankSchema.statics.build = (attrs: BankAttrs) => {
  return new Bank(attrs);
};

const Bank = mongoose.model<BankDoc, BankModel>(
  "Bank",
  bankSchema
);

export { Bank };
