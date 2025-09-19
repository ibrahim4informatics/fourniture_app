import { Box, Button, EmptyState, FormatNumber, Menu, Portal, Table, Text } from '@chakra-ui/react'
import React from 'react'
import { IoIosMore } from 'react-icons/io'
import { Link } from 'react-router-dom'


export type OrderProps = {
    id: number,
    ammount: number,
    customer: { [key: string]: any },
    date: string,
    status: "Delivered" | "Pending" | "Processing" | "Canceled" | "Refunded"
}

type Props = {
    orders: OrderProps[]
}

const Order: React.FC<OrderProps> = ({ ammount, customer, date, id, status }) => {
    const handleDeleteOrder = () => {
        console.log("delete order id= " + id)
    }
    return (

        <Table.Row>
            <Table.Cell>#{id}</Table.Cell>
            <Table.Cell><Text asChild color={"red.400"} textDecor={"underline"}><Link to={`/admin/customers/${customer.id}`}>{`${customer.first_name} ${customer.last_name}`}</Link></Text></Table.Cell>
            <Table.Cell>{new Date(date).toLocaleDateString("US", { year: "numeric", month: "short", day: "numeric" })}</Table.Cell>
            <Table.Cell>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                    <Box w={"8px"} h={"8px"} rounded={"full"} bgColor={status === "Delivered" ? "green.400" : status === "Processing" ? "yellow.400" : status === "Canceled" ? "red.600" : status === "Pending" ? "red.400" : "gray.400"}></Box>
                    <Text>{status}</Text>
                </Box>
            </Table.Cell>
            <Table.Cell><Text><FormatNumber value={ammount} style='currency' currency='USD' /></Text></Table.Cell>
            <Table.Cell>
                <Menu.Root>
                    <Menu.Trigger asChild>
                        <Button variant={"subtle"}><IoIosMore /></Button>
                    </Menu.Trigger>
                    <Portal>
                        <Menu.Positioner>
                            <Menu.Content>
                                <Menu.Item asChild value='show-order'>
                                    <Text color={"GrayText"} cursor={"pointer"} textDecor={"underline"} _hover={{ color: "red.600" }} outline={"none"} asChild><Link to={`/admin/orders/${id}`}>Show Order</Link></Text>
                                </Menu.Item>
                                <Menu.Item asChild value='edit-order'>
                                    <Text color={"GrayText"} cursor={"pointer"} textDecor={"underline"} _hover={{ color: "red.600" }} outline={"none"} asChild><Link to={`/admin/orders/edit/${id}`}>Process Order</Link></Text>
                                </Menu.Item>

                                <Menu.Item asChild value='delete-order'>
                                    <Text color={"red.700"} cursor={"pointer"} textDecor={"underline"} _hover={{ color: "red.600" }} outline={"none"} asChild><Button variant={"plain"} onClick={handleDeleteOrder}>Delete Order</Button></Text>
                                </Menu.Item>
                            </Menu.Content>
                        </Menu.Positioner>
                    </Portal>
                </Menu.Root>
            </Table.Cell>
        </Table.Row>
    );
}












const LatestOrders: React.FC<Props> = ({ orders }) => {
    return (
        <Box w={"full"} maxW={1280} mx={"auto"} py={6}>

            <Text fontSize={22}>Latest Orders</Text>

            <Table.ScrollArea border={"1px"} w={"full"} >
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>ORDER-ID</Table.ColumnHeader>
                            <Table.ColumnHeader>CUSTOMER-NAME</Table.ColumnHeader>
                            <Table.ColumnHeader>DATE</Table.ColumnHeader>
                            <Table.ColumnHeader>STATUS</Table.ColumnHeader>
                            <Table.ColumnHeader>AMOUNT</Table.ColumnHeader>
                            <Table.ColumnHeader>ACTIONS</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        {orders.length > 0 ?
                            orders.map(order => <Order key={order.id} id={order.id} ammount={order.ammount} customer={order.customer} date={order.date} status={order.status} />)
                            : <Text color={"GrayText"} mt={6}>No Recent Orders Aviable.</Text>
                        }

                    </Table.Body>
                </Table.Root>
            </Table.ScrollArea>

        </Box>


    )
}

export default LatestOrders