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
require("dotenv").config();

const router = express.Router();

router.get(
  "/messanger/desc/:product_id",
  cleanParam,
  async (req: Request, res: Response) => {
    const controller = new ProductController();
    const response = await controller.getMessages(+req.params.product_id);
    return res.send(response);
  }
);

router.get(
  "/price/:product_id",
  cleanParam,
  async (req: Request, res: Response) => {
    return res.send(req.params.product_id);
  }
);

router.get(
  "/shipping/:product_id",
  cleanParam,
  async (req: Request, res: Response) => {
    return res.send(req.params.product_id);
  }
);

router.post("/webhook", (req, res) => {
  let body = req.body;

  console.log(`\u{1F7EA} Received webhook:`);

  console.dir(body, { depth: null });
  console.log("body.object", body.object);

  if (body.object === "page") {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function (entry: any) {
      // Gets the body of the webhook event
      let webhookEvent = entry.messaging[0];
      console.log(webhookEvent);

      // Get the sender PSID
      let senderPsid = webhookEvent.sender.id;
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
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
}); // Add support for GET requests to our webhook

router.get("/webhook", (req, res) => {
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (
      (mode === "subscribe" && token === process.env.verifyToken) ||
      "lksdlksdlks"
    ) {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

export default router;
