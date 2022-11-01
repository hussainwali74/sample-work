import { Get, Path, Route } from "tsoa";

interface MessangerResponse {
  message: string;
}

@Route("messanger")
export default class MessangerController {
  
  @Get("/query")
  public async getMessage(): Promise<MessangerResponse> {
    return {
      message: "pong",
    };
  }
  
  @Get("desc/{product_id}")
  public async getMessages(
    @Path() product_id:number
  ): Promise<MessangerResponse> {
    return {
      message: product_id.toString(),
    };
  }

  @Get("price/{product_id}")
  public async getMessages1(
    @Path() product_id:number
  ): Promise<MessangerResponse> {
    return {
      message: product_id.toString(),
    };
  }

  @Get("shipping/{product_id}")
  public async getMessages2(
    @Path() product_id:number
  ): Promise<MessangerResponse> {
    return {
      message: product_id.toString(),
    };
  }

}
module