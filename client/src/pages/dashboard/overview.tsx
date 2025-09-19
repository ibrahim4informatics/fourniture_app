
import OverviewTopSection from '@/components/ui/dashboard/OverviewTopSection'
import DashboardLayout from '@/layouts/DashboardLayout'
import { Badge, Box, Button, FormatNumber, Grid, GridItem, Image, Menu, Portal, Table, Text } from '@chakra-ui/react'
import TotalOrdersWidget from '@/components/ui/dashboard/TotalOrdersWidget'
import TodayRevenueWidget from '@/components/ui/dashboard/TodayRevenueWidget'
import TodaySalesWidget from '@/components/ui/dashboard/TodaySalesWidget'

import { useChart, Chart } from "@chakra-ui/charts";
import { Bar, BarChart, CartesianGrid, LabelList, Legend, XAxis, YAxis } from "recharts";
import ProfitLossWidget from '@/components/ui/dashboard/ProfitLossWidget'
import { Link } from 'react-router-dom'
import { MdMore } from 'react-icons/md'
import { IoIosMore } from 'react-icons/io'
const Overview = () => {

    const data = [
        {profit:1200,loss:600, month:"January"},
        {profit:1700,loss:120, month:"February"},
        {profit:1400,loss:840, month:"March"},
        {profit:1000,loss:240, month:"April"},
        {profit:1600,loss:560, month:"May"},
        {profit:1740,loss:210, month:"June"},
        {profit:1250,loss:150, month:"Jully"},
        {profit:1240,loss:210, month:"August"},
        {profit:1210,loss:100, month:"September"},
        {profit:1010,loss:200, month:"October"},
        {profit:1250,loss:800, month:"November"},
        {profit:1240,loss:400, month:"December"},
    ]



    return (
        <DashboardLayout>
            <OverviewTopSection />
            <Grid w={"full"} gap={6} templateColumns={"repeat(3,1fr)"} maxW={1280} mx={"auto"} py={6}>
                <TodaySalesWidget todaySalesProfit={900} />
                <TodayRevenueWidget todayRevenueValue={1750} />
                <TotalOrdersWidget ordersCount={650} />

                <ProfitLossWidget 
                    data={data} />
            </Grid>

            <Box w={"full"} maxW={1280} mx={"auto"} py={6}>

                <Text fontSize={22}>Latest Orders</Text>

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
                        <Table.Row>
                            <Table.Cell>#178</Table.Cell>
                            <Table.Cell><Text asChild color={"red.400"} textDecor={"underline"}><Link to={"/"}>Ibrahim</Link></Text></Table.Cell>
                            <Table.Cell>{new Date("10-22-2024").toLocaleDateString("US", {year:"numeric", month:"short", day:"numeric"})}</Table.Cell>
                            <Table.Cell> <Box display={"flex"} alignItems={"center"} gap={1}><Box w={"8px"} h={"8px"} rounded={"full"} bgColor={"green.400"}></Box><Text>Delivered</Text></Box> </Table.Cell>
                            <Table.Cell><Text><FormatNumber value={600} style='currency' currency='USD' /></Text></Table.Cell>
                            <Table.Cell>
                                <Menu.Root>
                                    <Menu.Trigger asChild>
                                        <Button variant={"subtle"}><IoIosMore/></Button>
                                    </Menu.Trigger>
                                        <Portal>
                                            <Menu.Positioner>
                                                <Menu.Content>
                                                    <Menu.Item asChild value='show-order'>
                                                        <Text color={"GrayText"} cursor={"pointer"} textDecor={"underline"} _hover={{color:"red.600"}} outline={"none"} asChild><Link to={""}>Show Order</Link></Text>
                                                    </Menu.Item>
                                                    <Menu.Item asChild value='edit-order'>
                                                        <Text color={"GrayText"} cursor={"pointer"} textDecor={"underline"} _hover={{color:"red.600"}} outline={"none"} asChild><Link to={""}>Process Order</Link></Text>
                                                    </Menu.Item>

                                                    <Menu.Item asChild value='delete-order'>
                                                        <Text color={"red.700"} cursor={"pointer"} textDecor={"underline"} _hover={{color:"red.600"}} outline={"none"} asChild><Link to={""}>Delete Order</Link></Text>
                                                    </Menu.Item>
                                                </Menu.Content>
                                            </Menu.Positioner>
                                        </Portal>
                                </Menu.Root>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>

            </Box>
        </DashboardLayout>
    )
}

export default Overview