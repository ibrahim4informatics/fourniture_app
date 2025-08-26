import { Box, Heading, Image, Text } from '@chakra-ui/react'
import heroImage from "@/assets/images/hero.jpg"
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <Box pos={"relative"} width={"100%"} height={"100vh"} display={"flex"} alignItems={"center"} px={4} justifyContent={{base:"center", md:"end"}}>
        <Image pos={"absolute"} top={0} left={0} src={heroImage} w={"full"} h={"full"} />
        <Box pos={"absolute"} top={0} left={0} width={"full"} height={"full"} bg={"rgba(0,0,0,.4)"}></Box>

        <Box p={8} border={"none]"} borderRadius={12}  zIndex={90} width={600}  bg={"red.200"}>
            <Text fontSize={18} color={"blackAlpha.700"} my={6}>New Arrival</Text>
            <Heading size={"5xl"} color={"red.700"}>Discover Our <br />New Collection</Heading>
            <Text my={4} color={"black"} fontWeight={"bold"} fontSize={20}>High class of new fourniture with different categories and best prices</Text>
            <Box width={220} border={"none"} cursor={"pointer"} _hover={{backgroundColor:"red.600"}} transition={"all 300ms linear"} py={6} bg={"red.700"} color={"white"} display={"flex"} alignItems={"center"} justifyContent={"center"}><Link to={"/shop"}>Brows Now</Link></Box>
        </Box>
    </Box>
  )
}

export default Hero