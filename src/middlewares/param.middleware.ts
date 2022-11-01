import { NextFunction, Request, Response } from "express";

export const cleanParam = (req:Request,res:Response, next:NextFunction)=>{
    if(req.params.product_id){
        req.params.product_id = req.params.product_id.trim()
    }
    next()
}