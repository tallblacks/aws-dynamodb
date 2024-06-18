import dotenv from "dotenv"
import { readFile } from "fs/promises"
import { BatchWriteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb"

dotenv.config()
const client = new DynamoDBClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

const PutItem = async (item) => {
    const command = new BatchWriteItemCommand({
        RequestItems: {
            "ethan-timeline": [
                {
                    PutRequest: {
                        Item: {
                            date: { S: item.date },
                            type: { S: item.type },
                            event: { S: item.event },
                            description: { S: item.description },
                            timelineOrder: { N: item.timelineOrder.toString() },
                            ...(item.museum && { museum: { M: {
                                name: { S: item.museum.name },
                                city: { S: item.museum.city },
                                country: { S: item.museum.country }
                            }}}),
                            ...(item.flight && item.type === "Flight" && { flight: { M: {
                                airline: { S: item.flight.airline },
                                aircraftType: { S: item.flight.aircraftType },
                                flightNumber: { S: item.flight.flightNumber },
                                cabinClass: { S: item.flight.cabinClass },
                                departureCity: { S: item.flight.departureCity },
                                departureCountry: { S: item.flight.departureCountry },
                                arrivalCity: { S: item.flight.arrivalCity },
                                arrivalCountry: { S: item.flight.arrivalCountry }
                            }}}),
                            ...(item.flight && item.type === "FlightTakeoff" && { flight: { M: {
                                airline: { S: item.flight.airline },
                                aircraftType: { S: item.flight.aircraftType },
                                flightNumber: { S: item.flight.flightNumber },
                                cabinClass: { S: item.flight.cabinClass },
                                departureCity: { S: item.flight.departureCity },
                                departureCountry: { S: item.flight.departureCountry }
                            }}}),
                            ...(item.flight && item.type === "FlightLand" && { flight: { M: {
                                airline: { S: item.flight.airline },
                                aircraftType: { S: item.flight.aircraftType },
                                flightNumber: { S: item.flight.flightNumber },
                                cabinClass: { S: item.flight.cabinClass },
                                arrivalCity: { S: item.flight.arrivalCity },
                                arrivalCountry: { S: item.flight.arrivalCountry }
                            }}}),
                            ...(item.hotel && { hotel: { M: {
                                hotelGroup: { S: item.hotel.hotelGroup },
                                hotelBrand: { S: item.hotel.hotelBrand },
                                hotelName: { S: item.hotel.hotelName },
                                hotelCity: { S: item.hotel.hotelCity },
                                hotelCountry: { S: item.hotel.hotelCountry },
                                checkInDate: { S: item.hotel.checkInDate },
                                checkOutDate: { S: item.hotel.checkOutDate },
                                numberOfNights: { N: item.hotel.numberOfNights.toString() }
                            }}})
                        },
                    },
                },
            ],
        },
    })

    const response = await client.send(command)
    console.log(response)
    return response
}

export const main = async () => {
    try {
        const data = await readFile('ethanData.json', 'utf-8')
        const items = JSON.parse(data)

        items.map(item => {
            PutItem(item)
        })
    } catch (err) {
        console.error("Error batch write items:", err)
    }
}

main()