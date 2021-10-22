import express from 'express'
import { createBankRouter } from './create'

const router= express.Router()

router.use(createBankRouter)

export {router as indexBankRouter}