import CheckoutForm from "@/components/forms/CheckoutForm";
import CartCheckOutCard from "@/components/ui/CartCheckOutCard";
import AppLayout from "@/layouts/AppLayout"
import type { RootState } from "@/store/store";
import { Box } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom";

const Checkout = () => {
    const navigate = useNavigate();
    const cart = useSelector((state:RootState)=> state.cart)


    // TODO: Fetch User With Tanstack


    const userCart = useSelector((state: RootState) => state.cart);

    if (userCart.items.length < 1) {
        return <Navigate to={"/shop"} />;
    }

    return (
        <AppLayout>
            <Box mt={"70px"} display={"flex"} flexDir={{ base: "column", md: "row" }} w={"full"} gap={6} maxW={1024} px={2} py={6} mx={"auto"}>
                <CheckoutForm />

                <CartCheckOutCard height={150} width="full" showBtn={false} cart={cart.items} />
            </Box>
        </AppLayout>
    )
}

export default Checkout