import { Request, Response } from "express";
import { BadRequestError } from "../../../common";
import { Bank } from "../../../models/bank";
import { Transistion } from "../../../models/transistion";

const createTransistion = async (req: Request, res: Response) => {
    const {name, amount, date, bank} = req.body
    const thisBank= await Bank.findById(bank)

    if(!thisBank) throw new BadRequestError('No Bank Found')
    if(thisBank!.amount < amount) throw new BadRequestError('Insuffecient amount in your bank')

    thisBank!.amount= thisBank!.amount - amount

    const transistion= Transistion.build({name, amount, date, bank, user: req.currentUser!.id})
    const createdTransistion= await transistion.save();

    await thisBank!.save()

    res.status(200).send({
        data: createdTransistion
    })
};

export { createTransistion as createTransistionHandler };
