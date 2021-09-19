import express from 'express'
import { body } from 'express-validator'
import { currentUser, requireAuth, validateRequest } from '../../../common'
import { addExpenseHandler } from '../../../controllers/v1/expense/create'

const router= express.Router()

router.post('/', currentUser, requireAuth, [
    body("name").notEmpty().withMessage("Expense title must be provided"),
    body("amount").notEmpty().withMessage("Amount must be valid"),
] ,validateRequest, addExpenseHandler)

export {router as addExpenseRouter}