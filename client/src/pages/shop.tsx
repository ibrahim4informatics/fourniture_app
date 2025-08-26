import FiltersContainer from '@/components/ui/FiltersContainer';
import AppLayout from '@/layouts/AppLayout'
import { getProducts } from '@/services/products';
import extractFilters from '@/utils/extractFilters';
import { Box, Grid, GridItem, Spinner } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query';


import Pagination from '@/components/ui/Pagination';
import type { ProductCardProps } from '@/types/product';
import Product from '@/components/ui/Product';
import { useSearchParams } from 'react-router-dom';
import HeaderSection from '@/components/ui/HeaderSection';
import shopHeaderPicture from "@/assets/images/shop-header.jpg"

const Shop = () => {
    const [searchParams] = useSearchParams();
    const { isLoading, isError, data } = useQuery({
        queryKey: ["product", "shop", searchParams.get("page")],
        queryFn: async () => {

            const filters = extractFilters();

            return await getProducts(filters)
        }
    })
    return (
        <AppLayout>
            <HeaderSection title='Shop' picture={shopHeaderPicture} wave />
            <Box w={"full"}>

                <FiltersContainer result_count={data ? data.total : 0} />

                {!isLoading ? (
                    !isError && (
                        <>
                            <Grid templateColumns={{ base: "1fr", md: "repeat(2,1fr)", lg: "repeat(4,1fr)" }} gap={4} py={4} w={"full"} maxW={900} mx={"auto"} placeItems={"center"}>

                                {data.products.map((product: ProductCardProps) => (
                                    <GridItem key={product.id} asChild >
                                        <Product title={product.title} description={product.description} id={product.id} price={product.price} thumbnail={product.thumbnail} />
                                    </GridItem>
                                ))}


                            </Grid>

                            <Pagination count={data.total} pageSize={5} />
                        </>
                    )

                ) : <Box w={"full"} h={100} display={"flex"} alignItems={"center"} justifyContent={"center"}><Spinner color={"red"} size={"lg"} /></Box>}
            </Box>
        </AppLayout>
    )
}

export default Shop