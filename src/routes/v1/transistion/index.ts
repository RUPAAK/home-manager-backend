import express from 'express'
import { createTransistionRouter } from './create'

const router= express.Router()

router.use(createTransistionRouter)

export {router as indexTransistionRouter}