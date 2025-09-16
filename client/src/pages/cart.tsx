import HeaderSection from "@/components/ui/HeaderSection"
import AppLayout from "@/layouts/AppLayout"
import { Box, Button, Text } from "@chakra-ui/react"
import cartHeaderPicture from "@/assets/images/cart-header.jpg"
import CartProducts from "@/components/ui/CartProduct"
import CartCheckOutCard from "@/components/ui/CartCheckOutCard"
import { Link } from "react-router-dom"
import { useAppSelector } from "@/hooks/stateHooks"
const Cart = () => {
    const cart = useAppSelector(state=> state.cart);
    return (
        <AppLayout>
            <Box h={"100vh"} >

                <HeaderSection title="Cart" picture={cartHeaderPicture} wave={false} />

                <Box w={"full"} display={"flex"} p={4} mx={"auto"} maxW={1280} alignItems={"flex-start"} gap={2} flexWrap={{ base: "wrap-reverse", lg: "nowrap" }}>



                    {cart.items.length > 0 ? 
                        <>
                            <CartProducts cartProducts={cart.items} />
                            <CartCheckOutCard cart={cart.items} />
                        </>

                        : <Box w={"full"} p={5} display={"flex"} flexDir={"column"} justifyContent={"center"} alignItems={"center"} gap={6}>

                            <Text color={"GrayText"}>Your Cart is Empty Go To Shop</Text>
                            <Button colorPalette={"red"} asChild>
                                <Link to={"/shop"}>Shop Now!</Link>
                            </Button>

                        </Box>
                        }
                </Box>
            </Box>
        </AppLayout>
    )
}

export default Cart