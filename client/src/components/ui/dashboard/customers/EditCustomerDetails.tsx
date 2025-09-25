import EditCustomerForm from '@/components/forms/EditCustomerForm'
import { useAppSelector } from '@/hooks/stateHooks'
import { Box, Text } from '@chakra-ui/react'
import { motion } from 'motion/react'
import React from 'react'

const EditCustomerDetails: React.FC = React.forwardRef((_props, ref) => {
  const shownCustomerId = useAppSelector(state => state.dahsboard.customerShownId);
  return (
    <Box
      ref={ref} zIndex={{ base: 601, lg: 599 }} pos={"fixed"} top={0} left={{ base: 0, lg: "auto" }}
      w={{ base: "100%", lg: 400 }} right={{ base: "auto", lg: shownCustomerId ? 400 : 0 }}
      h={"100vh"} bg={"white"} shadow={"md"} p={6}
    >

      

        <Text mb={4} fontSize={24} fontWeight={"bold"}>Edit Customer</Text>
      

      

      <EditCustomerForm/>

    </Box>
  )
}
)



export default motion.create(EditCustomerDetails)