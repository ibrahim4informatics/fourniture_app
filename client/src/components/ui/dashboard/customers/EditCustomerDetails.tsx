import { useAppSelector } from '@/hooks/stateHooks'
import { Box } from '@chakra-ui/react'
import { motion } from 'motion/react'
import React from 'react'

type Props = {
    editingCustomerId:number | string
}
const EditCustomerDetails:React.FC<Props> = React.forwardRef(({editingCustomerId},ref) => {
    const shownCustomerId= useAppSelector(state=> state.dahsboard.customerShownId);
  return (
    <Box ref={ref} zIndex={{base:601, lg:599}} pos={"fixed"} top={0} left={{base:0, lg:"auto"}}  w={ {base:"100%", lg:400} } right={{base:"auto", lg: shownCustomerId ? 400 : 0}} h={"100vh"} bg={"red"}>Edit</Box>
  )
}
)



export default motion.create(EditCustomerDetails)