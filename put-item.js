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
        TableName: "ethan-timeline",
        Item: {
            date: { S: "23/06/2024" },
            type: { S: "Attractions" },
            event: { S: "Temple of Heaven" },
            description: { S: "Beijing, China" },
            timelineOrder: { N: "2024062300" },
        },
    })
  
    const response = await client.send(command)
    console.log(response)
    return response
}

main()