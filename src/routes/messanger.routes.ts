import express, { Request, Response } from "express";
import MessangerController from "../controllers/messanger.controller";
import { handleMessage, handlePostback } from "../services/fb.service";
const controller = new MessangerController();
require("dotenv").config();

const router = express.Router();

router.post("/webhook", async (req:Request, res:Response)=>{
  const result = await controller.handlePostWebhook(req);
  res.send(result)
});
router.get("/webhook", async(req:Request, res:Response)=>{
  const result = await controller.handleGetWebhook(req)
  res.status(500).send( result)
});
export default router