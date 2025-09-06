import HeaderSection from "@/components/ui/HeaderSection"
import AppLayout from "@/layouts/AppLayout";
import wishlistPicture from "@/assets/images/wishlist.jpg";
import { Box, Button, Grid, GridItem, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import Product from "@/components/ui/Product";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";

const Wishlist = () => {

    const wishlistProducts = useSelector((state: RootState) => state.wishlist.products);
    return (
        <AppLayout>
            <HeaderSection title="Wishlist" picture={wishlistPicture} wave={false} />

            <Box w={"full"} maxW={720} mx={"auto"} py={6} px={2} display={"flex"} justifyContent={"center"}>





                {
                    wishlistProducts.length > 0 ? (
                        <Grid templateColumns={{ base: "1fr", md: "repeat(2,1fr)", lg: "repeat(4,1fr)" }} gap={4} py={4} w={"full"} maxW={900} mx={"auto"} placeItems={"center"}>
                            {wishlistProducts.map((product) => (
                                <GridItem key={product.id} asChild >
                                    <Product title={product.title} description={product.description} id={product.id} price={product.price} thumbnail={product.thumbnail} />
                                </GridItem>
                            ))}
                        </Grid>) :
                        (
                            <Box w={"full"} p={5} my={4} display={"flex"} flexDir={"column"} alignItems={"center"} gap={4}>
                                <Text fontSize={22} my={4} color={"GrayText"}>No Products in WishList</Text>
                                <Button asChild colorPalette={"red"} size={"lg"} my={4}>
                                    <Link to={"/shop"}>Shop Now!</Link>
                                </Button>
                            </Box>
                        )
                }








            </Box>
        </AppLayout>
    )
}

export default Wishlist