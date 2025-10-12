import useProductQuery from "@/hooks/queries/useProductQuery";
import { useAppDispatch } from "@/hooks/stateHooks"
import { setShownProductID } from "@/store/slices/dashboardSlice";
import { Box, Button, FormatNumber, Span, Spinner, Text } from "@chakra-ui/react"
import { motion } from "motion/react";
import React from "react"
import { IoIosArrowBack } from "react-icons/io";

type Props = {
    product_id: string | number
}

const ShowProductDetails: React.FC<Props> = React.forwardRef(({ product_id }, ref) => {

    const { isLoading, error, data, isError } = useProductQuery(product_id);
    const dispatch = useAppDispatch();

    return (
        <Box ref={ref} w={"full"} maxW={400} pos={"fixed"} top={0} right={0} bg={"white"} zIndex={600} shadow={"md"} h={"100dvh"} py={4} px={2}>
            {
                isLoading ? (
                    <Box w={"full"} h={"full"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                        <Spinner size={"xl"} colorPalette={"red"} />
                    </Box>
                )
                    :
                    isError ? (
                        <Box w={"full"} h={"full"} p={6} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                            <Text color={"red.600"}>{error.message}</Text>
                        </Box>
                    )
                        : (
                            <Box w={"full"} h={"full"} overflowY={"auto"}>
                                <Box w={"full"} borderBottom={"solid 1px rgba(0,0,0,.15)"} py={2} display={"flex"} gap={4} alignItems={"center"}>
                                    <Button onClick={()=>dispatch(setShownProductID(null))} colorPalette={"red"} variant={"surface"}><IoIosArrowBack /></Button>
                                    <Text color={"black"} fontWeight={"bold"} fontSize={24}>{data!.title}</Text>
                                </Box>

                                {/* informations part */}
                                <Box display={"flex"} flexDir={"column"} gap={4}>

                                    <Text fontSize={24} fontWeight={"bold"}>Basic Data</Text>

                                    <Text>ID: <Span fontWeight={"bold"}>{data!.id}</Span></Text>
                                    <Text>SKU: <Span fontWeight={"bold"}>{data!.sku}</Span></Text>
                                    <Text>Price: <Span color={"green.600"} fontWeight={"bold"}><FormatNumber value={data!.price} style="currency" currency="USD"/></Span></Text>
                                    

                                </Box>
                            </Box>
                        )
            }
        </Box>
    )
})

export default motion.create(ShowProductDetails);