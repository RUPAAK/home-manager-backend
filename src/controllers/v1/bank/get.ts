import {Request, Response} from 'express'
import { Bank } from '../../../models/bank'

const getBanks= async(req: Request, res: Response)=>{
    const banks= await Bank.find({_id: req.currentUser!.id})

    res.status(200).send({
        total: banks.length,
        data: banks
    })
}

export {getBanks as getBanksHandler}