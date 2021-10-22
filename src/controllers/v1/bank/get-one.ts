import { Request, Response } from "express";
import { BadRequestError } from "../../../common";
import { Bank } from "../../../models/bank";

const getOneBank = async (req: Request, res: Response) => {
  const bank = await Bank.findById(req.params.id);

  if (!bank) throw new BadRequestError("Bank Not Found");

  res.status(200).send({
    data: bank,
  });
};

export { getOneBank as getOneBankHandler };
