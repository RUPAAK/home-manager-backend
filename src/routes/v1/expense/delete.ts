import express from 'express'
import { currentUser, requireAuth, validateRequest } from '../../../common'
import { deleteExpenseHandler } from '../../../controllers/v1/expense/delete'

const router= express.Router()

router.delete('/:id', currentUser, requireAuth, validateRequest, deleteExpenseHandler)

export {router as deleteExpenseRouter}