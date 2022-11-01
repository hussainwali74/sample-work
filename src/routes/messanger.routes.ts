import express, { Request, Response } from "express";
import MessangerController from "../controllers/messanger.controller";
import { cleanParam } from "../middlewares/param.middleware";
import { createHmac } from 'node:crypto'
require('dotenv').config()

const router = express.Router();

router.get(
  "/messanger/desc/:product_id",
  cleanParam,
  async (req: Request, res: Response) => {
    const controller = new MessangerController();
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
  console.log('body.object', body.object);
  
  if (body.object === "page") {
    // Returns a '200 OK'   response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});// Add support for GET requests to our webhook

// fb messanger token: EAAJSx0yZCUrwBAPw3eF0RT0Q1RZARdjh8WexZC1Su8GSo7U5s49upXyZA2ZABwhM1ntsBCFFy3CmWJJmfWmn1PEFFfFinA9BhhKiVD8x3a9LYxsgAXGtviIaI58fqhMzdsXaIO2W40Jej7lpzLVVUbWkF32n5yxVYuyLrgsl35RZBzpkWMualNASoZCAkZB77xIZD
router.get("/webhook", (req, res) => {
  
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];
  
  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === process.env.verifyToken||'lksdlksdlks') {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

// Verify that the callback came from Facebook.
function verifyRequestSignature(req:Request, res:Response, buf:Buffer) {
  var signature = req.headers["x-hub-signature-256"]?.toString();

  if (!signature) {
    console.warn(`Couldn't find "x-hub-signature-256" in headers.`);
  } else {
    var elements = signature.split("=");
    var signatureHash = elements[1];
    var expectedHash = createHmac("sha256", <string>process.env.verifyToken)
      .update(buf)
      .digest("hex");
    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}

export default router;
