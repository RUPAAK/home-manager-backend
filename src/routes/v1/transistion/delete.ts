import express from 'express'
import { currentUser, requireAuth, validateRequest } from '../../../common'
import { deleteTransistionHandler } from '../../../controllers/v1/transistion/delete'

const router = express.Router()

router.delete('/:id', currentUser, requireAuth, validateRequest, deleteTransistionHandler)

export {router as deleteTransistionRouter}