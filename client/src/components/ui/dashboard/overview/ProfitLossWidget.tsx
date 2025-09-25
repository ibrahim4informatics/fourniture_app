import { Chart, useChart } from '@chakra-ui/charts'
import { GridItem, Text } from '@chakra-ui/react'
import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts'

type ChartData = {
    profit:number,loss:number,month:string
}



type Props = {
    data:ChartData[],
}
const ProfitLossWidget:React.FC<Props> = ({data}) => {

    const chart = useChart({
        data,
        series: [
            { name: "profit", color: "red.600" },
            { name: "loss", color: "gray.300" }
        ],
    });
    return (
        <GridItem p={5} bg={"white"} overflowX={"auto"} rounded={"md"} shadow={"md"} colSpan={{base:1, md:2,lg:3}} h={350} cursor={"pointer"} _hover={{ scale: 1.01 }} transition={"all"}>

            <Text fontSize={22} my={2}>P/L Ratio</Text>
            <Chart.Root w={"full"}  minW={600} cursor={'pointer'} maxH={225} chart={chart}>

                <BarChart data={chart.data}>
                    <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />

                    <XAxis axisLine={false} tickLine={false} dataKey={chart.key("month")} tickFormatter={(value) => value.slice(0, 3)} />

                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={chart.formatNumber({
                            style: "currency",
                            currency: "USD",
                            notation: "compact",
                        })}
                    />

                    <Legend content={<Chart.Legend />} />

                    {chart.series.map(serie => (
                        <Bar
                            isAnimationActive={true} key={serie.name} dataKey={chart.key(serie.name)} fill={chart.color(serie.color)}
                            stroke={chart.color(serie.color)} stackId={serie.stackId} radius={5}
                        >
                        </Bar>
                    ))}
                </BarChart>

            </Chart.Root>
        </GridItem>
    )
}

export default ProfitLossWidget