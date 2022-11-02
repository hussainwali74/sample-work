import myDataSource from "../app-data-source";
import { Product } from "../entity/product.entity";
import Utils from "./utils.service";

const request = require('request')

const greeting_replies:string[] = [
  'How are you?',
  'I hope you\'re doing well.',
  'I hope you\'re having a great day.'
]
const endpoints:string[] = ['desc','price','shipping']

const greetings:string[]=['Hi', 'Hello', 'Good morning']

// Handles messaging_postbacks events
export function handlePostback(senderPsid: any, receivedPostback: any) {
  let response;

  // Get the payload for the postback
  let payload = receivedPostback.payload;

  // Set the response based on the postback payload
  if (payload === "yes") {
    response = { text: "Thanks!" };
  } else if (payload === "no") {
    response = { text: "Oops, try sending another image." };
  }
  // Send the message to acknowledge the postback
  callSendAPI(senderPsid, response);
}

// Handles messages events
export async function handleMessage(senderPsid: any, receivedMessage: any) {
  let response;

  // Checks if the message contains text
  const message_text:string = receivedMessage?.text
  if (message_text) {
    // handle greeting
    if(greetings.some(greeting=>message_text.includes(greeting))){
      const reply:string = Utils.getRandomFromList(greeting_replies)
      response = { text: reply}
    } else{      
      // Create the payload for message
      response = {
        text: `I am simple bot with a simple brain, I don't understand your query please wait for the page owner to talk to you.`,
      };
      //handle other queries
      const endpoint = endpoints.find(endpoint=>message_text.includes(endpoint)) 
      if(endpoint){
        const product_id = message_text.split(' ')[1] //assuming user will always put a space between query and product id
        if(product_id){
          let data;
          if (myDataSource.isInitialized) {
            data = await myDataSource.manager.getRepository(Product).findOneBy({ sku: +product_id });
          }else{
            data = Utils.getJsonData()
            data = data.find(
              (x: any) => x.sku == +product_id
              );
            }
          let ind:string = message_text.split(' ')[0]
          response = {text:JSON.stringify(data[ind])}
        }
      }
    }

  } else if (receivedMessage.attachments) {

    // Get the URL of the message attachment
    let attachmentUrl = receivedMessage.attachments[0].payload.url;
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Is this the right picture?",
              subtitle: "Tap a button to answer.",
              image_url: attachmentUrl,
              buttons: [
                {
                  type: "postback",
                  title: "Yes!",
                  payload: "yes",
                },
                {
                  type: "postback",
                  title: "No!",
                  payload: "no",
                },
              ],
            },
          ],
        },
      },
    };
  }

  // Send the response message
  callSendAPI(senderPsid, response);
}

// Sends response messages via the Send API
export function callSendAPI(senderPsid: any, response: any) {
  // The page access token we have generated in your app settings
  const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

  // Construct the message body
  let requestBody = {
    recipient: {
      id: senderPsid,
    },
    message: response,
  };

  // Send the HTTP request to the Messenger Platform
  request({
    'uri': 'https://graph.facebook.com/v2.6/me/messages',
    'qs': { 'access_token': PAGE_ACCESS_TOKEN },
    'method': 'POST',
    'json': requestBody
  }, (err:any, _res:any, _body:any) => {
    if (!err) {
      console.log('Message sent!');
    } else {
      console.error('Unable to send message:' + err);
    }
  });
}
