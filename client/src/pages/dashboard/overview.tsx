
import OverviewTopSection from '@/components/ui/dashboard/overview/OverviewTopSection'
import DashboardLayout from '@/layouts/DashboardLayout'
import { Grid } from '@chakra-ui/react'
import TotalOrdersWidget from '@/components/ui/dashboard/overview/TotalOrdersWidget'
import TodayRevenueWidget from '@/components/ui/dashboard/overview/TodayRevenueWidget'
import TodaySalesWidget from '@/components/ui/dashboard/overview/TodaySalesWidget'

import ProfitLossWidget from '@/components/ui/dashboard/overview/ProfitLossWidget'

import LatestOrders, { type OrderProps } from '@/components/ui/dashboard/overview/LatestOrders'
const Overview = () => {

    const data = [
        { profit: 1200, loss: 600, month: "January" },
        { profit: 1700, loss: 120, month: "February" },
        { profit: 1400, loss: 840, month: "March" },
        { profit: 1000, loss: 240, month: "April" },
        { profit: 1600, loss: 560, month: "May" },
        { profit: 1740, loss: 210, month: "June" },
        { profit: 1250, loss: 150, month: "Jully" },
        { profit: 1240, loss: 210, month: "August" },
        { profit: 1210, loss: 100, month: "September" },
        { profit: 1010, loss: 200, month: "October" },
        { profit: 1250, loss: 800, month: "November" },
        { profit: 1240, loss: 400, month: "December" },
    ]


    const LatestOrdersList:OrderProps[] = [
        {
            id: 1,
            ammount: 120.5,
            customer: { id: 101, first_name: "John", last_name: "Doe" },
            date: "2025-09-15T10:30:00Z",
            status: "Delivered",
        },
        {
            id: 2,
            ammount: 89.99,
            customer: { id: 102, first_name: "Sarah", last_name: "Connor" },
            date: "2025-09-16T14:45:00Z",
            status: "Pending",
        },
        {
            id: 3,
            ammount: 49.0,
            customer: { id: 103, first_name: "Michael", last_name: "Smith" },
            date: "2025-09-17T09:15:00Z",
            status: "Processing",
        },
        {
            id: 4,
            ammount: 220.75,
            customer: { id: 104, first_name: "Emily", last_name: "Johnson" },
            date: "2025-09-17T19:20:00Z",
            status: "Canceled",
        },
        {
            id: 5,
            ammount: 150.25,
            customer: { id: 105, first_name: "David", last_name: "Brown" },
            date: "2025-09-18T08:00:00Z",
            status: "Refunded",
        },
    ];



    return (
        <DashboardLayout>
            <OverviewTopSection />
            <Grid w={"full"} gap={6} templateColumns={{base:"1fr",md:"repeat(2,1fr)",lg:"repeat(3,1fr)"}} maxW={1280} mx={"auto"} py={6}>
                <TodaySalesWidget todaySalesProfit={900} />
                <TodayRevenueWidget todayRevenueValue={1750} />
                <TotalOrdersWidget ordersCount={650} />

                <ProfitLossWidget
                    data={data} />
            </Grid>

            <LatestOrders orders={LatestOrdersList} />

        </DashboardLayout>
    )
}

export default Overview