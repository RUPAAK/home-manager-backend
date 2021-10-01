import express from 'express'
import { createBankTransRouter } from './create'

const router= express.Router()

router.use(createBankTransRouter)

export {router as indexBankTransRouter}