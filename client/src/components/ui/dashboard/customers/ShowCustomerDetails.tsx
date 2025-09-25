import { useAppDispatch } from '@/hooks/stateHooks'
import { setEditingCustomerId, setShownCustomerID } from '@/store/slices/dashboardSlice'
import { Avatar, Badge, Box, Button, FormatNumber, Span, Text } from '@chakra-ui/react'
import { motion } from 'motion/react'
import React from 'react'
import { BiPackage } from 'react-icons/bi'
import { CiLocationOn } from 'react-icons/ci'
import { IoIosCall, IoIosClose, IoIosMail } from 'react-icons/io'
import { IoBanOutline, IoPencilOutline,  IoTrashBinOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const recentOrders = [
    { id: Math.ceil(Math.random() * 100), status: "Pending", ammount: 200, created_at: new Date("2025-09-24") },
    { id: Math.ceil(Math.random() * 100), status: "Delivered", ammount: 450, created_at: new Date("2025-09-22") },
    { id: Math.ceil(Math.random() * 100), status: "Processing", ammount: 120, created_at: new Date("2025-09-20") },
    { id: Math.ceil(Math.random() * 100), status: "Canceled", ammount: 300, created_at: new Date("2025-09-18") },
    { id: Math.ceil(Math.random() * 100), status: "Refunded", ammount: 180, created_at: new Date("2025-09-15") },
];


type Props = {
    customer_id: number | string
}

const CustomerRecentOrder: React.FC<{ recentOrder: typeof recentOrders[0] }> = ({ recentOrder }) => {
    return (<Box w={"full"} display={"flex"} gap={2} my={2} shadow={"sm"} rounded={"md"} px={2} py={6}>
        <Text color={"green.600"}><BiPackage size={25} /></Text>
        <Box flex={1} display={"flex"} flexDir={"column"} gap={2}>
            <Text>Placed Order <Span asChild color={"red.600"} textDecor={"underline"}><Link to={`/orders/${recentOrder.id}`}>#{recentOrder.id}</Link></Span></Text>
            <Box w={"full"} display={"flex"} alignItems={"center"} gap={3}>
                <Text color={"GrayText"} fontSize={12}>{recentOrder.created_at.toDateString()}</Text>

                <Text color={"GrayText"} fontSize={16}>.</Text>
                <Text color={"green.600"} fontSize={12}><FormatNumber value={recentOrder.ammount} style='currency' currency='USD' /> </Text>
            </Box>
        </Box>
    </Box>)
}

const ShowCustomerDetails: React.FC<Props> = React.forwardRef(({ customer_id }, ref) => {
    const dispatch = useAppDispatch();
    return (
        <Box zIndex={600} ref={ref} h={"100vh"} overflowY={"auto"} pos={"fixed"} right={0} top={0} w={"full"} maxW={400} bg={"white"} py={6} px={4} shadow={"md"}>

            <Box display={"flex"} w={"full"} pt={8} gap={4} px={4}>

                <Avatar.Root variant={"subtle"} size={"2xl"}>

                    <Avatar.Fallback name='Sara Johnson' />

                </Avatar.Root>

                <Box>
                    <Text fontSize={22}>Sara Johnson</Text>
                    <Badge variant={"subtle"} colorPalette={"green"} px={5} py={2} rounded={"full"} size={"lg"}>Active</Badge>
                </Box>

                <Button onClick={() => { dispatch(setShownCustomerID(null)) }} variant={"subtle"}><IoIosClose /></Button>

            </Box>


            {/* Quick actions */}
            <Box pt={8} pb={2} my={12} px={2} borderBottom={"1px solid rgba(0,0,0,.09)"} bg={"white"} >

                <Text fontWeight={"bold"}>Quick Actions</Text>
                <Box display={"flex"} flexWrap={"wrap"} w={"full"} mt={4} alignItems={"center"} py={4} gap={3} >

                    <Button flex={1} p={10} rounded={"md"} colorPalette={"white"} border={"1px solid rgba(0,0,0,.09)"} variant={"subtle"} size={"md"} display={"flex"} flexDir={"column"} gap={2} alignItems={"center"} justifyContent={"center"}>
                        <IoIosCall />
                        <Text>Call</Text>
                    </Button>


                    <Button onClick={()=> {dispatch(setEditingCustomerId(customer_id))} } flex={1} p={10} rounded={"md"} colorPalette={"white"} border={"1px solid rgba(0,0,0,.09)"} variant={"subtle"} size={"xl"} display={"flex"} flexDir={"column"} gap={2} alignItems={"center"} justifyContent={"center"}>
                        <IoPencilOutline />
                        <Text>Edit</Text>
                    </Button>


                    <Button p={10} flex={1} rounded={"md"} colorPalette={"red"} border={"1px solid rgba(0,0,0,.09)"} variant={"subtle"} size={"xl"} display={"flex"} flexDir={"column"} gap={2} alignItems={"center"} justifyContent={"center"}>
                        <IoTrashBinOutline />
                        <Text>Delete</Text>
                    </Button>


                    <Button p={10} flex={1} rounded={"md"} colorPalette={"red"} border={"1px solid rgba(0,0,0,.09)"} variant={"subtle"} size={"xl"} display={"flex"} flexDir={"column"} gap={2} alignItems={"center"} justifyContent={"center"}>
                        <IoBanOutline />
                        <Text>Ban</Text>
                    </Button>

                </Box>
            </Box>




            <Box w={"full"} borderBottom={"1px solid rgba(0,0,0,.09)"} pb={3} >

                <Text fontWeight={"bold"}>Contact Informations</Text>
                <Box w={"full"} display={"flex"} px={2} alignItems={"center"} gap={1} my={2}>

                    <Text fontSize={20} asChild color={"GrayText"}><IoIosMail /></Text>
                    <Text fontSize={16} >sarajohnson@mail.com</Text>
                </Box>

                <Box w={"full"} display={"flex"} px={2} alignItems={"center"} gap={1} my={2}>
                    <Text fontSize={20} asChild color={"GrayText"}><IoIosCall /></Text>
                    <Text fontSize={16} >0654432589</Text>
                </Box>


                <Box w={"full"} display={"flex"} px={2} alignItems={"center"} gap={1} my={2}>
                    <Text fontSize={20} asChild color={"GrayText"}><CiLocationOn /></Text>
                    <Text fontSize={16} >Oran</Text>
                </Box>

            </Box>






            <Box w={"full"} pt={3} borderBottom={"1px solid rgba(0,0,0,.09)"}>

                <Text fontWeight={"bold"}>Recent Orders</Text>

                {recentOrders.map(recentOrder => <CustomerRecentOrder key={recentOrder.id} recentOrder={recentOrder} />)}


            </Box>


            <Box pt={3} w={"full"}>

                <Text fontWeight={"bold"}>Customer Metrics</Text>


                <Box w={"full"} display={"flex"} gap={2} alignItems={"center"}>

                    <Box flex={2 / 3} shadow={"sm"} px={2} py={4} rounded={"md"}>
                        <Text fontSize={18} my={2} textAlign={"center"} color={"red.600"}>Total Orders</Text>
                        <Text fontSize={24} textAlign={"center"} fontWeight={"bold"}>21</Text>
                    </Box>
                    <Box flex={1} shadow={"sm"} px={2} py={4} rounded={"md"}>

                        <Text fontSize={18} my={2} textAlign={"center"} color={"green.600"}>Total Spend</Text>
                        <Text fontSize={24} textAlign={"center"} fontWeight={"bold"}><FormatNumber value={1425} style='currency' currency='USD' /></Text>
                    </Box>
                </Box>
            </Box>




        </Box>
    )
})

export default motion.create(ShowCustomerDetails);