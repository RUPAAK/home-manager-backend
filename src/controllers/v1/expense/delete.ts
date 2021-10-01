<<<<<<< HEAD
import { Request, Response } from "express";
import { BadRequestError } from "../../../common";
import { Expense } from "../../../models/expense";
=======
import {Request, Response} from 'express'
import { BadRequestError } from '../../../common'
import { Expense } from '../../../models/expense'
>>>>>>> 224d15bcfeb18c8886d96f9b5d05c430d4a7912e

const deleteExpense= async(req: Request, res: Response)=>{
    const expense= await Expense.findByIdAndDelete(req.params.id)

    if(!expense) throw new BadRequestError('Expense not found')

    res.status(200).send({
        data: null
    })
}

export {deleteExpense as deleteExpenseHandler}