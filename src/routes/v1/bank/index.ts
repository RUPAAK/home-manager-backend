import express from 'express'
import { createBankRouter } from './create'
import { updateBankRouter } from './update'

const router= express.Router()

router.use(createBankRouter)
router.use(updateBankRouter)

export {router as indexBankRouter}