import express from "express";
import { Controller, Get, Path, Post, Request, Route } from "tsoa";
import { handleMessage, handlePostback } from "../services/fb.service";

interface MessangerResponse {
  message: string;
}

@Route("messanger")
export default class MessangerController extends Controller {
  constructor(){
    super()
  }

  @Post("webhook")
  public async handlePostWebhook(@Request() req: express.Request):Promise<any> {

    let body = req.body;

    console.log(`\u{1F7EA} Received webhook:`);

    console.dir(body, { depth: null });
    console.log("body.object", body.object);

    if (body.object === "page") {
      // Iterates over each entry - there may be multiple if batched
      body?.entry.forEach(function (entry: any) {
        // Gets the body of the webhook event
        let webhookEvent = entry.messaging[0];
        console.log(webhookEvent);

        // Get the sender PSID
        let senderPsid = webhookEvent?.sender?.id;
        console.log("Sender PSID: " + senderPsid);

        // Check if the event is a message or postback and
        // pass the event to the appropriate handler function
        if (webhookEvent.message) {
          handleMessage(senderPsid, webhookEvent.message);
        } else if (webhookEvent.postback) {
          handlePostback(senderPsid, webhookEvent.postback);
        }
      });
      // Returns a '200 OK'   response to all requests
      return "EVENT_RECEIVED";
    } else {
      // Return a '404 Not Found' if event is not from a page subscription
      return {message: "something went wrong", status:404};
    }
  }

  @Get("webhook")
  public async handleGetWebhook(@Request() req: express.Request) {
    console.log("req", req);
return "oho"
  }
}
module;
