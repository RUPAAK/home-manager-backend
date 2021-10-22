import { Request, Response } from "express";
import { BadRequestError } from "../../../common";
import { Bank } from "../../../models/bank";

const updateBank = async (req: Request, res: Response) => {
  const { name, interest } = await req.body;
  const bank = await Bank.findById(req.params.id);
  if (!bank) throw new BadRequestError("Bank Not Found");

  bank.name = name || bank.name;
  bank.interest = interest || bank.interest;
  const savedBank = await bank.save();

  res.status(200).send({
    data: savedBank,
  });
};

export { updateBank as updateBankHandler };