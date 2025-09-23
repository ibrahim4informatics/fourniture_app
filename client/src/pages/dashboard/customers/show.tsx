import DashboardLayout from '@/layouts/DashboardLayout'
import { Avatar, Box, Span, Text } from '@chakra-ui/react'
import React from 'react'
import { FaPhone } from 'react-icons/fa'
import { IoIosPhonePortrait } from 'react-icons/io'
import { useParams } from 'react-router-dom'

const ShowCustomerDetails = () => {

    const { id: user_id } = useParams();
    return (
        <DashboardLayout>
            <Box bg={"red"} w={"full"} minH={"full"} display={"flex"} flexWrap={"wrap"} gap={3}>

                <Box display={"flex"} flexDir={"column"} bg={"white"} w={"full"} maxW={600}>

                    <Avatar.Root mx={"auto"} size={"2xl"}>
                        <Avatar.Fallback name='Ibrahim' />
                    </Avatar.Root>

                    <Text fontSize={27} textAlign={"center"} my={2} fontWeight={"bold"}>Ibrahim Benyahia</Text>

                    <Box pt={6} pl={4}>
                        <Text fontWeight={"bold"} fontSize={32} my={2}>Customer Details</Text>
                        

                        



                        <Text>
                            <Span fontWeight={"bold"}>Date Of Birth:</Span>
                            {new Date("10-19-2004").toDateString()}
                        </Text>

                    </Box>


                </Box>

                <Box bg={"green"} flex={1}></Box>



            </Box>
        </DashboardLayout>
    )
}

export default ShowCustomerDetails