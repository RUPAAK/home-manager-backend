import express from 'express'
import { currentUser, requireAuth, validateRequest } from '../../../common'
import { getUserExpenseHandler } from '../../../controllers/v1/expense/get-user'

const router= express.Router()

router.get('/userexpense', currentUser, requireAuth, validateRequest, getUserExpenseHandler)

export {router as getUserExpenseRouter}