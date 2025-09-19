import DashboardSidebar from '@/components/ui/dashboard/DashboardSidebar'
import { Box } from '@chakra-ui/react'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
    return (
        <Box w={"full"} display={"flex"}>

            <DashboardSidebar />


            <Box flex={1} p={6} overflowY={"auto"} h={"100vh"}>

                {children}

            </Box>



        </Box>
    )
}

export default DashboardLayout