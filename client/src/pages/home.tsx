
import Category from "@/components/ui/Category"
import Hero from "@/components/ui/Hero"
import Product from "@/components/ui/Product";
import AppLayout from "@/layouts/AppLayout"
import { getCategories } from "@/services/categories";
import { getHomeProducts } from "@/services/products";
import { Box, Button, Heading, Spinner } from "@chakra-ui/react"
import { useQuery } from '@tanstack/react-query';
import { motion } from "motion/react";
import { Link } from "react-router-dom";



const Home = () => {

    const { isError: categoriesError, isLoading: categoriesLoading, data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories
    });

    const { isError: productsErrors, isLoading: productsLoading, data: products } = useQuery({
        queryKey: ["products", "featured"],
        queryFn: getHomeProducts
    })

    return (
        <AppLayout name="home">
            <Hero />


            <Heading size={"lg"} color={"blackAlpha.600"} mt={4} textAlign={"center"}>Our Categories</Heading>

            <Box py={8} display={"flex"} alignItems={"center"} justifyContent={"center"} w={"full"} maxW={720} mx={"auto"}>
                {categoriesLoading ? <Spinner size={"lg"} color={"red"} /> : (
                    !categoriesError && (


                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

                            <Box w={"90%"} display={"flex"} alignItems={"center"} justifyContent={{ base: "center", lg: "flex-start" }} flexWrap={"wrap"} gap={4}>
                                {categories.map((category: any) => <Category key={category.id} thumbnail={category.thumbnail} name={category.name} id={category.id} />)}
                            </Box >
                        </motion.div>


                    )
                )}
            </Box>

            <Heading size={"lg"} color={"blackAlpha.600"} mt={4} textAlign={"center"}>Our Products</Heading>


            <Box py={8} display={"flex"} alignItems={"flex-start"} justifyContent={"center"} w={"full"} maxW={900} mx={"auto"}>
                {productsLoading ? <Spinner size={"lg"} color={"red"} /> : (
                    !productsErrors && (




                        <Box w={"90%"} display={"flex"} alignItems={"flex-start"} justifyContent={{ base: "center", lg: "flex-start" }} flexWrap={"wrap"} gap={4}>
                            {products.slice(0, 6).map((product: any) => <Product key={product.id} title={product.title} description={product.description} id={product.id} price={product.price} thumbnail={product.thumbnail} />)}
                        </Box >



                    )
                )}
            </Box>

            <Box w={"100%"} display={"flex"} justifyContent={"center"} pb={4}>
                <Button asChild variant={"outline"} size={"lg"} colorPalette={"red"}>
                    <Link to={"/shop"}>Show More</Link>
                </Button>
            </Box>

        </AppLayout>
    )
}

export default Home