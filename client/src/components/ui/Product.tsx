import { GlobalContext } from '@/contexts/CLientContext'
import type { ProductCardProps } from '@/types/product'
import { Button, Card, CardFooter, FormatNumber, Image, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { BsCartPlus, BsCartX } from 'react-icons/bs'
import { Link } from 'react-router-dom'



const Product: React.FC<ProductCardProps> = ({ title, description, price, thumbnail, id }) => {

    const { global, setGlobal } = useContext(GlobalContext);

    const isProductExistInCart = () => {
        return global.cart.filter(({ product }) => product.id === id).length > 0;
    }

    const handleAddToCart = () => {
        const cartProduct = {
            product: { title, thumbnail, id, price, description },
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

    const handleDeleteFromCart = () => {
        const newCartProducts = global.cart.filter(({ product }) => product.id !== id);
        setGlobal({ cart: newCartProducts });
        localStorage.setItem("cart", JSON.stringify(newCartProducts))

    }
    return (
        <Card.Root pos={"relative"} w={238} bg={"white"} _hover={{ bg: "gray.100", scale: 1.04 }} transition={"all 300ms linear"} >


            <Card.Header>
                <Image src={thumbnail} w={"full"} aspectRatio={"landscape"} objectFit={"cover"} objectPosition={"center"} />
            </Card.Header>

            <Card.Body>

                <Card.Title cursor={"pointer"} textDecoration={"underline"} asChild >
                    <Link to={`/shop/${id}`}>
                        {title}
                    </Link>
                </Card.Title>
                <Text color={"blackAlpha.600"}>{description}</Text>
            </Card.Body>
            <CardFooter display={"flex"} alignItems={"center"} gap={4} flexDir={"column"}>
                <Text fontSize={20} fontWeight={"bold"} color={"red.600"}>
                    <FormatNumber value={price} style='currency' currency='USD' />
                </Text>

                {
                    isProductExistInCart() ? (<Button pos={"absolute"} onClick={handleDeleteFromCart} rounded={"full"} w={12} h={12} top={2} right={4} colorPalette={"red"}>
                        <BsCartX />
                    </Button>) : (<Button pos={"absolute"} onClick={handleAddToCart} rounded={"full"} w={12} h={12} top={2} right={4} colorPalette={"green"}>
                        <BsCartPlus />
                    </Button>)
                }
            </CardFooter>
        </Card.Root>
    )
}

export default Product