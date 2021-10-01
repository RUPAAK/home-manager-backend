import { Request, Response } from "express";
import { Expense } from "../../../models/expense";

const getUserExpense= async(req: Request, res: Response)=>{
    const expenses= await Expense.find({user: req.currentUser!.id})
    res.send({
        data: expenses
    })
}

export {getUserExpense as getUserExpenseHandler}