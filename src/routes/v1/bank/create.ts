import express from 'express'
import { currentUser, requireAuth, validateRequest } from '../../../common'
import { createBankHandler } from '../../../controllers/v1/bank/create'

const router= express.Router()

router.post('/', currentUser, requireAuth, validateRequest, createBankHandler)

export {router as createBankRouter}