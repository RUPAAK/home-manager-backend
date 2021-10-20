import express from 'express'
import { createBankTransRouter } from './create'
import { getBanksRouter } from './get'

const router= express.Router()

router.use(createBankTransRouter)
router.use(getBanksRouter)

export {router as indexBankTransRouter}