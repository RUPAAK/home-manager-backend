import express from 'express'
import { createBankRouter } from './create'
import { getBanksRouter } from './get'
import { updateBankRouter } from './update'

const router= express.Router()

router.use(createBankRouter)
router.use(updateBankRouter)
router.use(getBanksRouter)

export {router as indexBankRouter}