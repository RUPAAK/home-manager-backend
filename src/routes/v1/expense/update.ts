import express from 'express'
import { currentUser, requireAuth, validateRequest } from '../../../common'
import { updateExpenseHandler } from '../../../controllers/v1/expense/update'

const router= express.Router()

router.patch('/:id', currentUser, requireAuth, validateRequest, updateExpenseHandler)

export {router as updateExpenseRouter}