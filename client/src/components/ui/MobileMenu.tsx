import { Box, Button, Heading } from '@chakra-ui/react'
import Logo from './Logo';
import { MdOutlineArrowBackIos } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import React from 'react';


type Props = {
    hideNavbarTrigger: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileMenu = React.forwardRef<HTMLDivElement, Props>((props, ref) => {

    const handleCloseButtonClick = () => props.hideNavbarTrigger(false);
    return (
        <Box zIndex={1200} ref={ref} display={"flex"} flexDir={"column"} px={2} py={4} position={"fixed"} borderRight={"solid 1px rgba(0,0,0,.15)"} top={0} left={0} bg={"white"} h={"100vh"} width={"80%"} maxW={400}>
            <Button variant={"ghost"} position={"absolute"} top={4} left={0} onClick={handleCloseButtonClick}>
                <MdOutlineArrowBackIos />
            </Button>
            <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"} flexDir={"column"} gap={2}>

                <Logo width='60' height='60' />

                <Heading>Fournito</Heading>
            </Box>

            <Box display={"flex"} flexDir={"column"} alignItems={"center"} mt={"auto"} mb={"auto"} justifyContent={"space-evenly"} flex={1}>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/shop"}>Shop</NavLink>
                <NavLink to={"/About"}>About</NavLink>
                <NavLink to={"/shop"}>Contact</NavLink>
            </Box>
        </Box>
    )
})

export default MobileMenu