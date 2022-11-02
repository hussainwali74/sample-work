import express, { Request, Response } from 'express'
import MessangerRouter from './messanger.routes'
import ProductRouter from './product.routes'

const router = express.Router()

router.get('/',async (req:Request, res:Response) => {
    return res.send(' testers')
})
.use('/messanger', MessangerRouter)
.use('/product', ProductRouter)

export default router