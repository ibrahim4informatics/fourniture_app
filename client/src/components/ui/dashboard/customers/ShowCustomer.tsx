import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'

const ShowCustomer = React.forwardRef((props, ref) => {
    return (
        <Box zIndex={400} w={"full"} maxW={600} bg={"white"} shadow={"sm"} px={6} py={12} h={"100vh"} pos={"absolute"} right={0} top={0}>

            <Box w={"full"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                <Text fontWeight={"bold"} fontSize={32}>Customer Details</Text>
                <Button variant={"surface"} colorPalette={"red"}><IoIosArrowForward/></Button>
            </Box>
        </Box>
    )
})

export default ShowCustomer