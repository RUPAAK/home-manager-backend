import {Request, Response} from 'express'
import { BadRequestError } from '../../../common'
import { Expense } from '../../../models/expense'

const deleteExpense= async(req: Request, res: Response)=>{
    const expense= await Expense.findByIdAndDelete(req.params.id)

    if(!expense) throw new BadRequestError('Expense not found')

    res.status(200).send({
        data: null
    })
}

export {deleteExpense as deleteExpenseHandler}