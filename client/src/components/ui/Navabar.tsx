import { Box, Button, Heading } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import { NavLink } from 'react-router-dom'
import { TbUserExclamation } from 'react-icons/tb'
import { IoSearchOutline } from 'react-icons/io5'
import { IoIosHeartEmpty } from 'react-icons/io'
import { BsCart3 } from 'react-icons/bs'

import { AnimatePresence, motion } from "motion/react"
import MobileMenu from './MobileMenu'
import { CiMenuFries } from 'react-icons/ci'
import { AnimatedSearchBar } from './SearchBar'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/store'


const AnimatedButton = motion.create(Button);
const AnimatedMenu = motion.create(MobileMenu);

type Props = {
    transparency?: boolean
}

const Navabar: React.FC<Props> = ({ transparency }) => {
    const cart = useSelector((state:RootState)=>state.cart);
    const [showNavbar, setShowNavbar] = useState<boolean>(false);
    const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
    const handleMenuButtonClick = () => setShowNavbar(true);
    const [scroll, setScroll] = useState(0);

    const searchBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOut = (event: any) => {
            if (!searchBarRef.current?.contains(event.target)) {
                setShowSearchBar(false);
            }
        }

        document.addEventListener("mousedown", handleClickOut);
        return () => {
            document.removeEventListener("mousedown", handleClickOut);
        }
    }, [searchBarRef]);

    useEffect(() => {

        const handleScroll = () => {
            setScroll(window.scrollY);
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);
    return (
        <>
            <Box>
                <Box pos={"fixed"} top={0} left={0} zIndex={100} as={"nav"} bg={(transparency && (scroll < 100)) ? "transparent" : "white"} transition={"all 300ms linear"} shadow={(transparency && (scroll < 100)) ? "none" : "sm"} w={"100%"} px={{ base: 4, md: 8, lg: 12 }} py={2} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>

                    <Box display={"flex"} alignItems={"center"} gap={2}>
                        <Logo width="40" height="40" />
                        <Heading color={(transparency && (scroll < 100)) ? "white" : 'black'}>Fournito</Heading>
                    </Box>




                    <Box display={{ base: "none", lg: "flex" }} alignItems={"center"} gap={4} color={(transparency && (scroll < 100)) ? "#fff" : "#000"}>
                        <NavLink to={"/"}>Home</NavLink>
                        <NavLink to={"/shop"}>Shop</NavLink>
                        <NavLink to={"/About"}>About</NavLink>
                        <NavLink to={"/contact"}>Contact</NavLink>
                    </Box>


                    <Box display={"flex"} alignItems={"center"} gap={4}>
                        <NavLink to={"/user"}>
                            <Box as={"span"} color={(transparency && (scroll < 100)) ? "white" : "blackAlpha.700"} fontSize={{ base: 25, md: 30 }} id='user'>
                                <TbUserExclamation />
                            </Box>
                        </NavLink>





                        <NavLink to={"/wishlist"}>
                            <Box as={"span"} color={(transparency && (scroll < 100)) ? "white" : "blackAlpha.700"} fontSize={{ base: 25, md: 30 }}>
                                <IoIosHeartEmpty />
                            </Box>
                        </NavLink>



                        <NavLink to={"/cart"}>
                            <Box pos={"relative"} bg={"red"} as={"span"} color={(transparency && (scroll < 100)) ? "white" : "blackAlpha.700"} fontSize={{ base: 25, md: 30 }}>
                                {cart.items.length > 0 && <Box pos={"absolute"} top={"-8px"} p={2} right={0} w={3} h={3} fontSize={10} display={"flex"} alignItems={"center"} justifyContent={"center"} color={"white"} fontWeight={"bold"} bg={"red.400"} rounded={"full"}>{cart.items.length}</Box>}
                                <BsCart3 />
                            </Box>
                        </NavLink>

                        <Button variant={"ghost"} onClick={() => { setShowSearchBar(true); console.log(searchBarRef.current) }} asChild fontSize={{ base: 60, md: 65 }} color={(transparency && (scroll < 100)) ? "white" : "blackAlpha.700"}>
                            <IoSearchOutline />
                        </Button>


                        <AnimatePresence initial={false}>
                            {!showNavbar && <AnimatedButton
                                initial={{ opacity: 0, right: -10 }} animate={{ opacity: 1, right: 0 }} exit={{ opacity: 0, right: -10 }}
                                display={{ base: "block", lg: "none" }} variant={"ghost"} colorPalette={(transparency && (scroll < 100)) ? "white" : "black"} onClick={handleMenuButtonClick} size={{ base: "md", md: "lg" }} fontSize={{ base: 25, md: 30 }}>
                                <CiMenuFries />
                            </AnimatedButton>}
                        </AnimatePresence>
                    </Box>

                </Box>

                <AnimatePresence initial={false}>
                    {showNavbar && <AnimatedMenu initial={{ opacity: 0, left: "-100%" }} animate={{ opacity: 1, left: 0 }} exit={{ opacity: 0, left: "-100%" }} hideNavbarTrigger={setShowNavbar} />}
                </AnimatePresence>
            </Box>

            <AnimatePresence>
                {showSearchBar && <AnimatedSearchBar ref={searchBarRef} initial={{ top: -20, opacity: 0 }} animate={{ top: 60, opacity: 1 }} exit={{ opacity: 0, top: -20 }} />}
            </AnimatePresence>
        </>
    )
}

export default Navabar