import {Request, Response} from 'express'
import { Expense } from '../../../models/expense'

const getExpenses= async(req: Request, res: Response)=>{
    const expenses= await Expense.find({user: req.currentUser!.id}).sort({createdAt: -1})
    res.status(200).send({
        data: expenses
    })
}

export {getExpenses as getExpensesHandler}