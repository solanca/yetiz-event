import axios from "axios";
import fs from "fs";
import { ResponseMagicEdenType } from "./types";
import { sleep } from "./utils/utils";
import { getMetadataAccount } from "./utils/getMetadata";



const fetchAndUpdateActivities = async (collectionSymbol: string, filePath: string) => {
  try {
    const response = await axios.get<ResponseMagicEdenType[]>(
      `https://api-mainnet.magiceden.dev/v2/collections/${collectionSymbol}/activities`
    );
    console.log("Fetched data:", response.data);
    const newActivities = response.data;

    let existingActivities: ResponseMagicEdenType[] = [];
    if (fs.existsSync(filePath)) {
      const rawData = fs.readFileSync(filePath, 'utf-8');
      existingActivities = JSON.parse(rawData);
    }
    const allActivities = [...existingActivities, ...newActivities];
    const uniqueActivities = Array.from(new Map(allActivities.map(activity => [activity.signature, activity])).values());
    const newLength = uniqueActivities.length - existingActivities.length;
    console.log('newLength==',newLength)
    
    fs.writeFileSync(filePath, JSON.stringify(uniqueActivities, null, 2));
    console.log(`Updated ${filePath} with ${uniqueActivities.length} unique activities`);
    if(newLength > 0) {
        const getAttributes = newActivities.slice(0,newLength).map(async (item,index) => {
          return await getMetadataAccount(item.tokenMint);
          
        })

        const attributes = await Promise.all(getAttributes);
        console.log('attributes==',attributes);

        //Discord alert or database update
        
    }
  } catch (error) {
    console.error("Error fetching activities:", error);
  }
};

const collectionSymbol = "yetiz"; 
const filePath = "activity.json";

const startFetching = async () => {
  while (true) {
    await fetchAndUpdateActivities(collectionSymbol, filePath);
    await sleep(60000); 
  }
};

startFetching();
