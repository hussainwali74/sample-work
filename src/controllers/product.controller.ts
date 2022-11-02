import { Controller, Get, Path, Route } from "tsoa";

interface ProductResponse {
  message: string;
}

@Route("product")
export default class ProductController extends Controller {
  
  @Get("/query")
  public async getMessage(): Promise<ProductResponse> {
    return {
      message: "pong",
    };
  }
  
  @Get("desc/{product_id}")
  public async getMessages(
    @Path() product_id:number
  ): Promise<ProductResponse> {
    return {
      message: product_id.toString(),
    };
  }

  @Get("price/{product_id}")
  public async getMessages1(
    @Path() product_id:number
  ): Promise<ProductResponse> {
    return {
      message: product_id.toString(),
    };
  }

  @Get("shipping/{product_id}")
  public async getMessages2(
    @Path() product_id:number
  ): Promise<ProductResponse> {
    return {
      message: product_id.toString(),
    };
  }

}
module