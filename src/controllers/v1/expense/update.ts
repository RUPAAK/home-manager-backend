import {Request, Response} from 'express'
import { BadRequestError } from '../../../common'
import { Expense } from '../../../models/expense'

const updateExpense= async(req: Request, res: Response)=>{
    const {name, amount, date}= req.body
    
    const expense= await Expense.findById(req.params.id)
    if(!expense) throw new BadRequestError('Expense not found')

    expense!.name= name || expense!.name;
    expense!.amount= amount || expense!.amount;
    expense!.date= date || expense!.date;

    const updatedExpense= await expense!.save()
    
    res.status(200).send({
        data: updatedExpense
    })
}

export {updateExpense as updateExpenseHandler}