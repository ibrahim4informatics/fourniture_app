import { Box, FormatNumber, GridItem, Image, Text } from '@chakra-ui/react'
import React from 'react'
import todaySalesImage from "@/assets/images/todaysSales.svg"


type Props = {
    todaySalesProfit:number
}
const TodaySalesWidget :React.FC<Props> = ({todaySalesProfit}) => {
    return (
        <GridItem cursor={"pointer"} _hover={{ scale: 1.01 }} transition={"all"} p={5} bg={"white"} display={"flex"} rounded={"md"} shadow={"md"} h={165}>
            <Box flex={1}>
                <Text>Todays Sales</Text>
                <Text fontSize={34} mt={2}><FormatNumber value={todaySalesProfit} currency='USD' style='currency' /></Text>
                <Text fontSize={16} color={"GrayText"} mt={2}>2 items sold today</Text>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
                <Image src={todaySalesImage} />
            </Box>
        </GridItem>
    )
}

export default TodaySalesWidget