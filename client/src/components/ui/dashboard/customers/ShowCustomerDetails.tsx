import { useAppDispatch } from '@/hooks/stateHooks'
import { setShownCustomerID } from '@/store/slices/dashboardSlice'
import { Avatar, Badge, Box, Button, Text } from '@chakra-ui/react'
import { motion } from 'motion/react'
import React from 'react'
import { IoIosCall, IoIosClose, IoIosMail, IoIosOpen, IoIosTrash } from 'react-icons/io'
import { IoBanOutline, IoPencilOutline, IoPhonePortraitOutline, IoTrashBinOutline } from 'react-icons/io5'


type Props = {
    customer_id: number | string
}
const ShowCustomerDetails: React.FC<Props> = React.forwardRef(({ customer_id }, ref) => {
    const dispatch = useAppDispatch();
    return (
        <Box ref={ref} h={"100vh"} overflowY={"auto"} pos={"fixed"} right={0} top={0} w={"full"} maxW={400} bg={"white"} py={6} px={4} shadow={"md"}>

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


                    <Button flex={1} p={10} rounded={"md"} colorPalette={"white"} border={"1px solid rgba(0,0,0,.09)"} variant={"subtle"} size={"xl"} display={"flex"} flexDir={"column"} gap={2} alignItems={"center"} justifyContent={"center"}>
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




            <Box w={"full"} borderBottom={"1px solid rgba(0,0,0,.09)"} pb={3}>

                <Text fontWeight={"bold"}>Contact Informations</Text>
                <Box w={"full"} display={"flex"} px={2} alignItems={"center"} gap={1} my={2}>

                    <Text fontSize={20} asChild color={"GrayText"}><IoIosMail /></Text>
                    <Text fontSize={16} >sarajohnson@mail.com</Text>
                </Box>



                <Box w={"full"} display={"flex"} px={2} alignItems={"center"} gap={1} my={2}>


                    <Text fontSize={20} asChild color={"GrayText"}><IoIosCall /></Text>
                    <Text fontSize={16} >0654432589</Text>
                </Box>


            </Box>




        </Box>
    )
})

export default motion.create(ShowCustomerDetails);