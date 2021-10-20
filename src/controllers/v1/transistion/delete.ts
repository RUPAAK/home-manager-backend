import {Request, Response} from 'express'
import { BadRequestError } from '../../../common'
import { Transistion } from '../../../models/transistion'

const deleteTransistion= async(req: Request, res: Response)=>{
    const transstion= await Transistion.findByIdAndDelete(req.params.id)

    if(!transstion) throw new BadRequestError('Transinstion not found')

    res.status(200).send({
        data: null
    })
}

export {deleteTransistion as deleteTransistionHandler}