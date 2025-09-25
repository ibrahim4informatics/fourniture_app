import { Box, FormatNumber, GridItem, Image, Text } from '@chakra-ui/react'
import React from 'react'
import totalOrders from "@/assets/images/totalOrders.svg"

type Props = {
  ordersCount:number
}

const TotalOrdersWidget:React.FC<Props> = ({ordersCount}) => {
  return (

    <GridItem cursor={"pointer"} _hover={{ scale: 1.01 }} transition={"all"} p={5} bg={"white"} display={"flex"} rounded={"md"} shadow={"md"} h={165}>
      <Box flex={1}>
        <Text>Total Orders</Text>
        <Text fontSize={34} mt={2}><FormatNumber value={ordersCount} /></Text>
        <Text fontSize={16} color={"GrayText"} mt={2}>aviable to payout</Text>
      </Box>
      <Box display={"flex"} alignItems={"center"}>
        <Image src={totalOrders} />
      </Box>
    </GridItem>
  )
}

export default TotalOrdersWidget