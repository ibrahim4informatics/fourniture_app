import { GlobalContext } from '@/contexts/CLientContext'
import type { RootState } from '@/store/store'
import { Box, Button, FormatNumber, Text } from '@chakra-ui/react'
import  { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'



const CartCheckOutCard = () => {
   const cart = useSelector((state:RootState)=> state.cart)

    const [total, setTotal] = useState(0);

    useEffect(() => {
        let sum = 0;
        cart.items.forEach(({ product, quantity }) => {
            sum += (product.price * quantity)
        })

        setTotal(sum);
    }, [localStorage.getItem("cart")])

    return (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"space-between"} w={{ base: "full", lg: 400 }} p={4} rounded={"md"} bg={"white"} shadow={"sm"} gap={6}>
            <Text fontSize={24} fontWeight={"bold"}>Totals</Text>


            <Text color={"green"} fontWeight={"bold"} textAlign={"center"} fontSize={28}><FormatNumber value={total} currency="USD" style="currency" /></Text>



            <Button my={6} colorPalette={"green"} size={"xl"} >
                Order Now
            </Button>

        </Box>
    )
}

export default CartCheckOutCard