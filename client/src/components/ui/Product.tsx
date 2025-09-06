import { addToCart, removeFromCart } from '@/store/slices/cartSlice'
import type { ProductCardProps } from '@/types/product'
import { Button, Card, CardFooter, FormatNumber, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { BsCartPlus, BsCartX } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { type RootState } from '@/store/store'
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io'
import { addToWishlist, removeFromWishList } from '@/store/slices/wishListSlice'


const Product: React.FC<ProductCardProps> = ({ title, description, price, thumbnail, id }) => {

    const cart = useSelector((state: RootState) => state.cart);
    const wishlistExist = useSelector((state: RootState) => state.wishlist.products.filter(product => product.id === id).length > 0);
    const dispatch = useDispatch();

    const handleAddToWishlist = () => {
        dispatch(addToWishlist({ id, description, price, thumbnail, title }));
    }


    const handleRemoveFromWishlist = ()=>{
        dispatch(removeFromWishList(id));
    }
    return (
        <Card.Root pos={"relative"} w={238} bg={"white"} _hover={{ bg: "gray.100", scale: 1.04 }} transition={"all 300ms linear"} h={400} >

            <Card.Header>
                <Image loading='lazy' src={thumbnail} w={"full"} aspectRatio={"landscape"} objectFit={"cover"} objectPosition={"center"} />
            </Card.Header>

            <Card.Body>

                <Card.Title cursor={"pointer"} textDecoration={"underline"} asChild >
                    <Link to={`/shop/${id}`}>
                        {title}
                    </Link>
                </Card.Title>
                <Text color={"blackAlpha.600"}>{description}</Text>
            </Card.Body>
            <CardFooter display={"flex"} alignItems={"center"} gap={4} flexDir={"row"}>
                {
                    !wishlistExist ? <Button onClick={handleAddToWishlist} colorPalette={"red"} variant={"plain"}>
                        <IoMdHeartEmpty />
                    </Button>

                    : <Button onClick={handleRemoveFromWishlist} colorPalette={"red"} variant={"plain"}>
                        <IoMdHeart />
                    </Button>
                }
                <Text fontSize={20} fontWeight={"bold"} color={"red.600"}>
                    <FormatNumber value={price} style='currency' currency='USD' />
                </Text>



                {cart.items.filter(item => item.product.id === id).length < 1 ? <Button pos={"absolute"} onClick={() => { dispatch(addToCart({ id, description, price, thumbnail, title })) }} rounded={"full"} w={12} h={12} top={2} right={4} colorPalette={"green"}>
                    <BsCartPlus />
                </Button> :

                    <Button pos={"absolute"} onClick={() => { dispatch(removeFromCart(id)) }} rounded={"full"} w={12} h={12} top={2} right={4} colorPalette={"red"}>
                        <BsCartX />
                    </Button>
                }

            </CardFooter>
        </Card.Root>
    )
}

export default Product