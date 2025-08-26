import { GlobalContext } from '@/contexts/CLientContext'
import { Box, Button, FormatNumber, Heading, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { FaStar } from 'react-icons/fa'

type Props = {
    data: { [key: string]: string | number }
}

const ProductMetaData: React.FC<Props> = ({ data }) => {
    const { global, setGlobal } = useContext(GlobalContext);


    const isProductExistInCart = () => {
        return global.cart.filter(({ product }) => product.id === parseInt(data.id.toString())).length > 0;
    }

    const handleAddToCart = () => {
        const cartProduct = {
            product: { title: data.title as string, thumbnail: data.thumbnail as string, id: parseInt(data.id.toString()) as number, price: data.price as number, description: data.description as string },
            quantity: 1
        }


        const cartProducts = global.cart;

        if (!cartProducts.length) {
            setGlobal(prev => ({ ...prev, cart: [cartProduct] }))
            localStorage.setItem("cart", JSON.stringify([cartProduct]));
        }
        else {

            if (!isProductExistInCart()) {
                setGlobal(prev => ({ ...prev, cart: prev.cart.concat(cartProduct) }))
                localStorage.setItem("cart", JSON.stringify(cartProducts.concat(cartProduct)))
            }
        }
    }
    return (
        <Box flex={1}>
            <Heading size={"4xl"} textAlign={{ base: "left", md: "right" }}>{data.title}</Heading>
            <Text textAlign={{ base: "left", md: "right" }} fontSize={20} color={"GrayText"} mt={2}>

                <FormatNumber value={data.price as number} style='currency' currency='USD' />
            </Text>


            <Box display={"flex"} justifyContent={{ base: "start", md: "end" }} alignItems={"center"}>

                <Text pe={2} borderRight={"solid 1px rgba(0,0,0,.30)"} display={"flex"} color={"yellow.400"} alignItems={"center"} gap={1} fontSize={32} fontWeight={"bold"} mt={2}>

                    <FormatNumber value={data.rating as number} style='decimal' currency='USD' />
                    <FaStar />
                </Text>

                <Text color={"rgba(0,0,0,.3)"} px={3}>5 Customer Review</Text>

                <Button onClick={handleAddToCart} disabled={isProductExistInCart()}>Add To Cart</Button>
            </Box>

            <Text p={12}>
                {data.description}
            </Text>
        </Box>
    )
}

export default ProductMetaData