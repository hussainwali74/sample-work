import express, { Request, Response } from "express";
import { cleanParam } from "../middlewares/param.middleware";
import myDataSource from "../app-data-source";
import { Product } from "../entity/product.entity";
import Utils from "../services/utils.service";
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
    console.log(myDataSource.isInitialized);
    let data;
    let product_id = req.params.product_id;
    if (myDataSource.isInitialized) {
      const repo = myDataSource.manager.getRepository(Product);
      if (product_id) {
        data = await repo.findOneBy({ sku: +req.params.product_id });
      } else {
        data = await repo.find({ take: 10 });
      }
    } else {
      data = Utils.getJsonData()
      if(product_id){
        data = data.find(
          (x: any) => x.sku == +req.params.product_id
          );
        }else{
          data = data.slice(0,10)
        }
    }
    return res.send(data);
  }
);

export default router;
