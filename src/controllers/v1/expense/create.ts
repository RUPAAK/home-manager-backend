import { Request, Response } from "express";
import { Expense } from "../../../models/expense";

const addExpense= async(req: Request, res: Response)=>{
    const {name, amount, date}= req.body;

    const expense= Expense.build({name, amount, date, user: req.currentUser!.id})
    const createdExpense= await expense.save()

    res.status(201).send({
        data: createdExpense
    })
}

export {addExpense as addExpenseHandler}