import { Box, Button, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import Logo from '../Logo'
import DashboardLink from './DashboardLink'
import { Link } from 'react-router-dom'
import { IoMdEye } from 'react-icons/io'
import { MdCategory, MdDashboard, MdListAlt, MdLogout } from 'react-icons/md'
import { FaBoxOpen } from 'react-icons/fa'
import {BiUserCircle} from "react-icons/bi"

const DashboardSidebar = () => {
    return (
        <Box h={"100vh"} w={{base:70,lg:370}} overflowX={"auto"} bg={"white"} shadow={"md"} display={"flex"} flexDir={"column"} py={6} px={2}>

            {/* Top Section */}
            <Box w={"full"} display={"flex"} alignItems={"center"} gap={1}>

                <Logo width='50' height='50' />
                <Heading display={{base:"none",lg:"block"}} size={"2xl"}>Fournito</Heading>
            </Box>


            {/* Links */}

            <Box w={"full"} flex={1} display={"flex"} flexDir={"column"} mt={8} gap={6} py={4}>
                <DashboardLink text='Overview' href='/admin' icon={<MdDashboard />} variant='navlink' />
                <DashboardLink text='Customers' href='/admin/customers' icon={<BiUserCircle />} variant='navlink' />
                <DashboardLink text='Products' href='/admin/products' icon={<FaBoxOpen />} variant='navlink' />
                <DashboardLink text='Categories' href='/admin/categories' icon={<MdCategory />} variant='navlink' />
                <Box pos={"relative"}>
                    <Box pos={"absolute"} right={2} top={"50%"} transform={"translateY(-50%)"} fontSize={12} color={"white"} w={6} h={6} rounded={"full"}  display={{base:"none", lg:"flex"}} alignItems={"center"} justifyContent={"center"} bg={"red.600"} border={"solid 2px "} borderColor={"red.600"} >1</Box>
                    <DashboardLink text='Orders' href='/admin/orders' icon={<MdListAlt />} variant='navlink' />
                </Box>
            </Box>




            <Button mt={"auto"} display={"flex"} asChild mb={3} colorPalette={"black"} variant={"surface"}>
                <Link to={"/shop"}>
                    <IoMdEye />
                    <Text display={{base:"none", lg:"block"}}>View Store</Text>
                </Link>
            </Button>
            <Button mt={"auto"} colorPalette={"red"} variant={"surface"}>
                <MdLogout />
                Exit
            </Button>



        </Box>
    )
}

export default DashboardSidebar