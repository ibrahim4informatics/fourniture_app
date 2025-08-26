import  Orders from '@/components/ui/Orders';
import AppLayout from '@/layouts/AppLayout'
import { getOrders } from '@/services/orders';
import { Avatar, Badge, Box, Button, FormatNumber, Heading, Spinner, Table, TableScrollArea, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'

const User = () => {

    const {data:orders, isLoading, isError} = useQuery({
        queryKey:["orders"],
        queryFn:getOrders
    });

    const [tab, setTab] = useState("ORDERS");
    return (
        <AppLayout>

            <Box mt={59} w={"full"} px={6} py={12} mx={"auto"} maxW={920} h={"100vh"}>
                <Box display={"flex"} gap={4} w={"full"} flexWrap={"wrap"}>

                    <Avatar.Root size={"2xl"}>
                        <Avatar.Fallback name='User' />
                    </Avatar.Root>
                    <Box>
                        <Heading size={"2xl"} color={"red.600"}>Welcome Username</Heading>
                        <Text mt={2} color={"GrayText"}>we hope you are doing well!</Text>
                    </Box>

                    <Box ms={{ base: 0, md: "auto" }} display={"flex"} gap={2}>
                        <Button variant={tab === "ORDERS" ? "solid" : "outline"} onClick={() => { setTab("ORDERS") }}>Orders</Button>
                        <Button variant={tab === "PROFILE" ? "solid" : "outline"} onClick={() => { setTab("PROFILE") }}>Profile</Button>
                    </Box>
                </Box>


                {
                    tab === "ORDERS" ?
                        isLoading || isError ? (<Spinner color={"red"} size={"lg"} p={6} mx={"auto"} />) : <Orders orders={orders} /> :
                        (
                            <>
                                <Text>Personal INforamtion Here</Text>
                            </>
                        )
                }
            </Box>

        </AppLayout>
    )
}

export default User