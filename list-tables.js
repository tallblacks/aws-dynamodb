import dotenv from "dotenv"
import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb"

dotenv.config()
const client = new DynamoDBClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

export const main = async () => {
    const command = new ListTablesCommand({})

    try {
        const response = await client.send(command)
        const tableNames = response.TableNames

        console.log("Table Names:")
        tableNames.forEach(tableName => {
            console.log(`- ${tableName}`)
        })

        return response
    } catch (err) {
        console.error("Error listing tables:", err)
    }
}
    
main()