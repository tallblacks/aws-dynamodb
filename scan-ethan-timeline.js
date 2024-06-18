import dotenv from "dotenv"
import { ScanCommand , DynamoDBClient } from "@aws-sdk/client-dynamodb"

dotenv.config()
const client = new DynamoDBClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

export const main = async () => {
    const command = new ScanCommand({
        TableName: "ethan-timeline",
    })
  
    const response = await client.send(command)

    // 对结果进行排序
    const sortedItems = response.Items.sort((a, b) => {
        return parseInt(a.timelineOrder.N) - parseInt(b.timelineOrder.N);
    })

    console.log(sortedItems.length)
    sortedItems.forEach(function(item) {
        console.log(`${item.type.S}\n`)
        console.log(`${item.date.S} - ${item.event.S}\n`)
        console.log(`${item.description.S}\n`)
        console.log(`\n`)
    })
    
    return sortedItems
}

main()