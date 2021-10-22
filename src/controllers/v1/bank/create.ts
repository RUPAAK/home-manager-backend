import {Request, Response} from 'express'
import { BadRequestError } from '../../../common'
import {Bank} from '../../../models/bank'

const createBankTrans= async(req: Request, res: Response)=>{
    const {name, amount, interest, date}= req.body
    const bankTrans= Bank.build({name, amount, interest, date, user: req.currentUser!.id})
    const createdBankTrans= await bankTrans.save();

    if(!createdBankTrans) throw new BadRequestError('Error: Creating Bank Record')
    res.status(201).send({
        data: createdBankTrans
    })
    
}

export {createBankTrans as createBankTransHandler}