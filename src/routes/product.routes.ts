import express, { Request, Response } from "express";
import MessangerController from "../controllers/messanger.controller";
import { cleanParam } from "../middlewares/param.middleware";
import { createHmac } from "node:crypto";
import {
  callSendAPI,
  handleMessage,
  handlePostback,
} from "../services/fb.service";
import ProductController from "../controllers/product.controller";
import myDataSource from "../app-data-source";
import { Product } from "../entity/product.entity";
require("dotenv").config();

const router = express.Router();

/**
 * get list of 10 products or product by id
 * just for testing
 */
router.get(
    "/get_products/:product_id?",
    cleanParam,
    async (req: Request, res: Response) => {
        const repo = myDataSource.manager.getRepository(Product)
        let data
        if(req.params.product_id){
            data = await repo.findOneBy({sku:+req.params.product_id})
        }else{
         data = await repo.find({take:10})
        }
    return res.send(data);
  }
);


export default router;
