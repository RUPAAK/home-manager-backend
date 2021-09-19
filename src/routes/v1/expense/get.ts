import express from 'express'
import { body } from 'express-validator'
import { currentUser, requireAuth, validateRequest } from '../../../common'
import { getExpensesHandler } from '../../../controllers/v1/expense/get'

const router= express.Router()

router.get('/', currentUser, requireAuth, validateRequest, getExpensesHandler)

export {router as getExpensesRouter}