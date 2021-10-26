import express from 'express'
import { currentUser, requireAuth, validateRequest } from '../../../common'
import { createTransistionHandler } from '../../../controllers/v1/transistion/create'

const router= express.Router()

router.post("/:id", currentUser, requireAuth, validateRequest, createTransistionHandler)

export {router as createTransistionRouter}