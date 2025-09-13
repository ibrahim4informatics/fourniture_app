import { Box, Button, FormatNumber, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { type CartProductType } from './CartProduct'
import { Link } from 'react-router-dom'

type Props = {
    cart: CartProductType[],
    showBtn?: boolean,
    width?: string,
    height?:number
}

const CartCheckOutCard: React.FC<Props> = ({ cart, width, showBtn = true, height }) => {


    const [total, setTotal] = useState(0);

    useEffect(() => {
        let sum = 0;
        cart.forEach(({ product, quantity }) => {
            sum += (product.price * quantity)
        })

        setTotal(sum);
    }, [localStorage.getItem("cart")])

    return (
        <Box display={"flex"} h={height || "auto"} flexDirection={"column"} alignItems={"center"} justifyContent={"space-between"} w={{ base: "full", lg: width || 400 }} p={4} rounded={"md"} bg={"white"} shadow={"sm"} gap={6}>
            <Text fontSize={24} fontWeight={"bold"}>Totals</Text>


            <Text color={"green"} fontWeight={"bold"} textAlign={"center"} fontSize={28}><FormatNumber value={total} currency="USD" style="currency" /></Text>



            {showBtn && <Button asChild my={6} colorPalette={"green"} size={"xl"} >
                <Link to={"/checkout"}>Order Now</Link>
            </Button>}

        </Box>
    )
}

export default CartCheckOutCard