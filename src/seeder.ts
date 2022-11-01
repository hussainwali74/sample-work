import https from "https";
import { DataSource } from "typeorm";
import { Product } from "./entity/product.entity";
import { User } from "./entity/User.entity";
import fs from 'fs'

const getData = (): Promise<any> => {
  console.log("getting data, please wait");

  const prom = new Promise((resolve, reject) => {
    let data = "";
    https.get(
      "https://raw.githubusercontent.com/BestBuyAPIs/open-data-set/master/products.json",
      (res) => {
        res.on("data", (d) => {
          data += d;
        });
        res.on("end", () => {
          //save to external file for offline use
          // fs.writeFile('myjsonfile.json', data, err=>{
          //   if (err) {
          //     throw err
          //   }
          //   console.log('JSON data is saved.')
          // });

          resolve(data);
        });
        res.on("error", (error) => {
          console.log("21 error", error);
          reject(error);
        });
      }
    );
  });
  return prom;
};

export const seedData = async (dataSource: DataSource) => {
  try {
    console.log('---------------------------------------------------------')
    console.log('Please wait, DB seeding in progress')
    console.log('---------------------------------------------------------')
    let data = await getData();

    if (data) {
      data = JSON.parse(data);
      
      // if getting driver error ECONNRESET, modify mysql my.ini :
      // change `max_allowed_packet=10M` to `max_allowed_packet=100M`
 
      await dataSource.createQueryBuilder().insert().into(Product).values(data).execute();
      console.log("");
      console.log("db seeding complete!");
    }
  } catch (error) {
    console.log("error seeding data", error);
  }
};
