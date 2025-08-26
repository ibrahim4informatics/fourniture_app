import { Box, Heading, Text } from "@chakra-ui/react"


type Props = {
    details: string
}
const ProductDetailsSection: React.FC<Props> = ({ details }) => {
    return (
        <Box w={"full"}>
            <Heading color={"red.600"} size={"lg"} mt={4}>Product Details:</Heading>


            <Text asChild pb={4} pt={2}>
                <div dangerouslySetInnerHTML={{ __html: details }}></div>
            </Text>

        </Box>
    )
}

export default ProductDetailsSection