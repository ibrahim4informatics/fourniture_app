import { useAppDispatch } from "@/hooks/stateHooks"
import { setShownProductID } from "@/store/slices/dashboardSlice";
import { Box, Button } from "@chakra-ui/react"
import { motion } from "motion/react";
import React from "react"

type Props = {
    product_id: string | number
}

const ShowProductDetails: React.FC<Props> = React.forwardRef(({ product_id }, ref) => {
    const dispatch = useAppDispatch();
    return (
        <Box overflowY={"auto"} ref={ref} w={"full"} maxW={400} pos={"fixed"} top={0} right={0} bg={"white"} zIndex={600} shadow={"md"} h={"100dvh"} py={4} px={2}>
            <Button onClick={() => { dispatch(setShownProductID(null)) }}>Close</Button>
        </Box>
    )
})

export default motion.create(ShowProductDetails);