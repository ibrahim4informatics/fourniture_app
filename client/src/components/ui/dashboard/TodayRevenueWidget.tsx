import { Box, FormatNumber, GridItem, Image, Text } from '@chakra-ui/react'
import React from 'react'
import todayRevenueImage from "@/assets/images/totalRevenue.svg"
type Props = {
    todayRevenueValue:number
}

const TodayRevenueWidget:React.FC<Props> = ({todayRevenueValue}) => {
    return (
        <GridItem cursor={"pointer"} _hover={{ scale: 1.01 }} transition={"all"} p={5} bg={"white"} display={"flex"} rounded={"md"} shadow={"md"} h={165}>
            <Box flex={1}>
                <Text>Todays Revenue</Text>
                <Text fontSize={34} mt={2}><FormatNumber value={todayRevenueValue} currency='USD' style='currency' /></Text>
                <Text fontSize={16} color={"GrayText"} mt={2}>aviable to payout</Text>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
                <Image src={todayRevenueImage} />
            </Box>
        </GridItem>
    )
}

export default TodayRevenueWidget