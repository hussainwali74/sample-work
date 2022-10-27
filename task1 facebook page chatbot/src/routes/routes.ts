import express, { Request, Response } from 'express'
import { Route } from 'tsoa'
import PingController from '../controllers/ping'

const router = express.Router()

router.get('/',async (req:Request, res:Response) => {
    return res.send(' testers')
    
})

router.get("/ping", async (_req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.send(response);
  });

router.get('/test',async (req:Request, res:Response) => {
    return res.send('hello testers')
    
})

export default router