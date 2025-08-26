import { Badge, Box, FormatNumber, Heading, Table, TableScrollArea, Text } from '@chakra-ui/react'
import React from 'react'



type OrderItem = {

    cost: number,
    id: number,
    status: string

}

const Order: React.FC<OrderItem> = ({ cost, id, status }) => {
    return (

        <Table.Row>
            <Table.Cell>
                <Text fontWeight={"bold"}>#{id}</Text>
            </Table.Cell>
            <Table.Cell>

                <Badge colorPalette={(status === "canceled" || status === "pending") ? "red" : status === "processing" ? "yellow" : "green"}>{status}</Badge>
            </Table.Cell>
            <Table.Cell>
                <Text color={"green.600"}>
                    <FormatNumber style='currency' currency='USD' value={cost} />
                </Text>
            </Table.Cell>

        </Table.Row>

    )
}

type Props = {
    orders: OrderItem[]
}

const Orders: React.FC<Props> = ({ orders }) => {
    return (
        <Box>
            <Heading mt={4} mb={2} textAlign={"center"} color={"red.600"}>Your Orders</Heading>
            <TableScrollArea w={"full"} maxW={700} mx={'auto'}>
                <Table.Root variant={"outline"} my={2} w={"full"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader minW={"200px"}>ID</Table.ColumnHeader>
                            <Table.ColumnHeader minW={"100px"} >STATUS</Table.ColumnHeader>
                            <Table.ColumnHeader minW={"100px"} >COST</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        {orders.map(order => <Order key={order.id} cost={order.cost} status={order.status} id={order.id} />)}


                    </Table.Body>

                </Table.Root>
            </TableScrollArea>
        </Box>
    )
}

export default Orders