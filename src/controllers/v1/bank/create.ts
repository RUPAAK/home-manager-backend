import {Request, Response} from 'express'
import { BadRequestError } from '../../../common'
import { Bank } from '../../../models/bank'

const createBank= async(req: Request, res: Response)=>{
    const {name, amount,  interest} = await req.body

    const existBank= await Bank.findOne({name})
    if(existBank) throw new BadRequestError('Bank already exist')

    const bank= await Bank.build({name, amount, interest}).save()
    
    res.status(201).send({
        data: bank
    })
}

export {createBank as createBankHandler}