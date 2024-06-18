import dotenv from "dotenv"
import { QueryCommand , DynamoDBClient } from "@aws-sdk/client-dynamodb"

dotenv.config()
const client = new DynamoDBClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

export const main = async () => {
    const command = new QueryCommand({
        KeyConditionExpression: "#tp = :typeValue",
        ExpressionAttributeValues: {
            ":typeValue": { S: "Hotel" },
        },
        ProjectionExpression: "#dt, #tp, event, description",
        ExpressionAttributeNames: {
            "#dt": "date",
            "#tp": "type"
        },
        TableName: "ethan-timeline",
    })
  
    const response = await client.send(command)
    response.Items.forEach(function(item) {
        console.log(`${item.date.S} - ${item.event.S}\n`)
    })
    return response
}

main()