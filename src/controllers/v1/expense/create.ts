import { Request, Response } from "express";
import { Expense } from "../../../models/expense";

const addExpense= async(req: Request, res: Response)=>{
    const {title, amount, date}= req.body;

    const expense= Expense.build({title, amount, date})
    const createdExpense= await expense.save()

    res.status(201).send({
        data: createdExpense
    })
}

export {addExpense as addExpenseHandler}