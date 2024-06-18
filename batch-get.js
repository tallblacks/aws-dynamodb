import dotenv from "dotenv"
import { BatchGetItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb"

dotenv.config()
const client = new DynamoDBClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

export const main = async () => {
    const command = new BatchGetItemCommand({
        RequestItems: {
            "ethan-timeline": {
                Keys: [
                    {
                        type: { S: "Celebration" },
                        timelineOrder: { N: "2021102000" }
                    },
                ],
                ProjectionExpression: "#dt, #tp, event, description",
                ExpressionAttributeNames: {
                    "#dt": "date", // 将保留关键字转换为合法的属性名
                    "#tp": "type"
                },
            },
        },
    })
  
    const response = await client.send(command)
    console.log(response.Responses["ethan-timeline"])
    return response
}

main()