import mongoose from "mongoose";

interface BankAttrs {
  name: string;
  amount: number;
  interest?: string;
  active?: boolean;
}

interface BankModel extends mongoose.Model<BankDoc> {
  build(attrs: BankAttrs): BankDoc;
}

interface BankDoc extends mongoose.Document, BankAttrs {
  name: string;
  amount: number;
  interest: string;
  active: boolean;
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
    interest: {
      type: String,
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

bankSchema.index({ name: "text" });

bankSchema.statics.build = (attrs: BankAttrs) => {
  return new Bank(attrs);
};

const Bank = mongoose.model<BankDoc, BankModel>("Bank", bankSchema);

export { Bank };
