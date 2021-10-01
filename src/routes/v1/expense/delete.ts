import express from 'express'
import { currentUser, requireAuth, validateRequest } from '../../../common'
import { deleteExpenseHandler } from '../../../controllers/v1/expense/delete'

<<<<<<< HEAD
const router= express.Router()
=======
const router = express.Router()
>>>>>>> 224d15bcfeb18c8886d96f9b5d05c430d4a7912e

router.delete('/:id', currentUser, requireAuth, validateRequest, deleteExpenseHandler)

export {router as deleteExpenseRouter}