import myDataSource from "../app-data-source";
import { Product } from "../entity/product.entity";

const sgMail = require("@sendgrid/mail");
require('dotenv').config()
export default class Utils {
  /**
   * @param list array of any type
   * @returns random entry from the list
   */
  static getRandomFromList = (list: any[]) =>
    list[Math.floor(Math.random() * list.length)];

  /**
   * if database is not available (e.g., for heroku live)
   */
  static getJsonData = () => {
    return require("../../myjsonfile.json");
  };

  /**
   * get product detail by product id either from json or db 
   */
  static getProductDetailsByid = async(product_id:number)=>{
    let data
    if (myDataSource.isInitialized) {
        data = await myDataSource.manager.getRepository(Product).findOneBy({ sku: +product_id });
      }else{
        data = Utils.getJsonData().find((x: any) => x.sku == +product_id);
    }
    return data
  }

  /**
   * send email using sendgrid
   *
   */
  static sendMail = async ( data:any) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: "hussain.wali@propsure.com.pk", // Change to your recipient
      from: "hussainwali743@gmail.com", // Change to your verified sender
      subject: "Sending with SendGrid is Fun",
      text: "name, price and shipping fee, so that you can process the order for the customer",
      html: `
      <!DOCTYPE html>
<html>
  <head>
    <style>
      #customers {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }

      #customers td,
      #customers th {
        border: 1px solid #ddd;
        padding: 8px;
      }

      #customers tr:nth-child(even) {
        background-color: #f2f2f2;
      }

      #customers tr:hover {
        background-color: #ddd;
      }

      #customers th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #04aa6d;
        color: white;
      }
    </style>
  </head>
  <body>
    <h1>name, price and shipping fee, so that you can process the order for the customer</h1>

    <table id="customers">
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Shipping Fee</th>
      </tr>
      <tr>
        <td>${data.name}</td>
        <td>${data.price}</td>
        <td>${data.shipping}</td>
      </tr>
    </table>
  </body>
</html>

      `,
    };

    sgMail
      .send(msg)
      .then((response:any) => {
        console.log(response[0].statusCode);
        console.log(response[0].headers);
      })
      .catch((error:any) => {
        console.error(error);
      });
  };
 
}
