import dotenv from "dotenv"
import { GetItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb"

dotenv.config()
const client = new DynamoDBClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

export const main = async () => {
    const command = new GetItemCommand({
        TableName: "ethan-timeline",
        Key: {
            "type": { S: "Celebration" },
            "timelineOrder": { N: "2021102000" }
        }
    })
  
    const response = await client.send(command)
    console.log(response)
    return response
}

main()