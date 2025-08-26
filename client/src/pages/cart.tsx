import HeaderSection from "@/components/ui/HeaderSection"
import AppLayout from "@/layouts/AppLayout"
import { Box } from "@chakra-ui/react"
import cartHeaderPicture from "@/assets/images/cart-header.jpg"
import { useContext } from "react"
import { GlobalContext } from "@/contexts/CLientContext"
import CartProducts from "@/components/ui/CartProduct"
import CartCheckOutCard from "@/components/ui/CartCheckOutCard"
const Cart = () => {
    const { global } = useContext(GlobalContext);
    return (
        <AppLayout>
            <Box h={"100vh"} >

                <HeaderSection title="Cart" picture={cartHeaderPicture} wave={false} />

                <Box w={"full"} display={"flex"} p={4} mx={"auto"} maxW={1280} alignItems={"flex-start"} gap={2} flexWrap={{ base: "wrap-reverse", lg: "nowrap" }}>

                    <CartProducts cartProducts={global.cart} />

                    <CartCheckOutCard />
                </Box>
            </Box>
        </AppLayout>
    )
}

export default Cart