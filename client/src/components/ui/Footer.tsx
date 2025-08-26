import { Box, Button, Heading, Input, InputGroup, Text } from '@chakra-ui/react'
import Logo from './Logo'
import { Link, NavLink } from 'react-router-dom'

const Footer = () => {

    return (
        <Box width={"100%"} px={8} borderTop={"solid 0.5px rgba(0,0,0,.1)"}>
            <Box display={"flex"} gap={6} alignItems={"flex-start"} justifyContent={"space-between"} flexWrap={"wrap"} width={"100%"} px={{ base: 4, md: 8, lg: 12 }} py={6} >
                <Box px={4}>
                    <Box display={"flex"} flexDir={"column"} gap={4} pb={12}>
                        <Logo width="80" height="80" />
                        <Heading color={"black"} size={"4xl"}>Funiro.</Heading>
                    </Box>

                    <Text fontSize={18} color={"blackAlpha.400"}>

                        400 University Drive Suite 200 Coral <br />Gables,<br />
                        FL 33134 USA
                    </Text>
                </Box>


                <Box px={4}>

                    <Heading color={"blackAlpha.600"} size={"md"}>Links</Heading>

                    <Box display={"flex"} flexDir={"column"} gap={6} mt={3}>
                        <NavLink to={"/"}>Home</NavLink>
                        <NavLink to={"/shop"}>Shop</NavLink>
                        <NavLink to={"/About"}>About</NavLink>
                        <NavLink to={"/shop"}>Contact</NavLink>
                    </Box>

                </Box>



                <Box px={4}>

                    <Heading color={"blackAlpha.600"} size={"md"}>Help</Heading>

                    <Box display={"flex"} flexDir={"column"} gap={6} mt={3}>
                        <Link to={"/#payments"}>Payment Options</Link>
                        <Link to={"/About"}>Return</Link>
                        <Link to={"/#privacy"}>Privacy & Policies</Link>
                    </Box>

                </Box>



                <Box px={4}>

                    <Heading color={"blackAlpha.600"} size={"md"}>Newsletter</Heading>

                    <InputGroup my={4} endElementProps={{ margin: 0, padding: 0 }} endElement={<Button colorPalette={"red"}>Sub</Button>}>

                        <Input placeholder="Enter Your Email." />

                    </InputGroup>

                </Box>
            </Box>
            <Box width={"100%"} h={"1px"} bg={"rgba(0,0,0,.1)"} my={4}></Box>
            <Text color={"blackAlpha.600"} fontSize={14} my={2}>2025 furino. All rights reverved</Text>
        </Box>
    )
}

export default Footer