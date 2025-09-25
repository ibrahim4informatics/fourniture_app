import EditCustomerDetails from '@/components/ui/dashboard/customers/EditCustomerDetails'
import ShowCustomerDetails from '@/components/ui/dashboard/customers/ShowCustomerDetails'
import DashboardSidebar from '@/components/ui/dashboard/DashboardSidebar'
import { useAppSelector } from '@/hooks/stateHooks'
import { Box } from '@chakra-ui/react'
import { AnimatePresence } from 'motion/react'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const DashboardLayout: React.FC<Props> = ({ children }) => {

    const shownCustomerId = useAppSelector(state=>state.dahsboard.customerShownId);
    const editingCustomerId = useAppSelector(state=>state.dahsboard.editingCustomerId)
    return (
        <Box w={"full"} display={"flex"}>

            <AnimatePresence>

                {shownCustomerId && <ShowCustomerDetails key={1} initial={{ right: "-100%" }} animate={{ right: 0 }} exit={{ right: "-100%" }} customer_id={shownCustomerId} />}


                {editingCustomerId && (
                    <>

                        <Box display={{ base: "none", lg: "block" }}>
                            <EditCustomerDetails key={2} initial={{ right: shownCustomerId ? 0 : "-100%" }} animate={{ right: shownCustomerId ? 400 : 0 }} exit={{ right: editingCustomerId ? 0 : "-100%" }} />
                        </Box>

                        <Box display={{ base: "block", lg: "none" }}>
                            <EditCustomerDetails key={3} initial={{ left: "-100%" }} animate={{ left: 0 }} exit={{ left: "-100%" }} />

                        </Box>

                    </>
                )}




            </AnimatePresence>

            <DashboardSidebar />


            <Box flex={1} p={6} overflowY={"auto"} h={"100vh"}>

                {children}

            </Box>



        </Box>
    )
}

export default DashboardLayout