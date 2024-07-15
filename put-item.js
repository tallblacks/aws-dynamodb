import dotenv from "dotenv"
import { PutItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb"

dotenv.config()
const client = new DynamoDBClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

export const main = async () => {
    const command = new PutItemCommand({
        TableName: "EthanTimeline",
        Item: {
            date: { S: "24/05/2024" },
            type: { S: "Subway" },
            event: { S: "The first subway ride was on the Shenzhen Metro, China" },
            description: { S: "Experienced a round-trip train journey from Britomart to NewMarket in Auckland in 2023" },
            timelineOrder: { N: "2024052420" },
            /*hotel: { M: {
                hotelGroup: { S: "Hyatt Hotels Corporation" },
                hotelBrand: { S: "Grand Hyatt" },
                hotelName: { S: "Grand Hyatt Beijing" },
                hotelCity: { S: "Beijing" },
                hotelCountry: { S: "China" },
                checkInDate: { S: "13/07/2024" },
                checkOutDate: { S: "14/07/2024" },
                numberOfNights: { N: "1" }
            }}*/
        },
    })
  
    const response = await client.send(command)
    console.log(response)
    return response
}

main()