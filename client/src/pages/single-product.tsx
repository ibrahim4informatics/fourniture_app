import ProductDetailsSection from '@/components/ui/ProductDetailsSection';
import ProductMetaData from '@/components/ui/ProductMetaData';
import SingleProductMediaViewer from '@/components/ui/SingleProductMediaViewer';
import AppLayout from '@/layouts/AppLayout';
import { getProductByID } from '@/services/products';
import { Box,  Spinner } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom'
const SingleProduct = () => {
    const { id } = useParams();
    if (!id) throw new Error("Error no Id")
    const { data, isError, isLoading } = useQuery({
        queryKey: ["products", id],
        queryFn: async () => getProductByID(parseInt(id))
    });
    if (isLoading || !data) {
        return <Box w={"full"} h={"100vh"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Spinner color={"red"} size={"xl"} />
        </Box>
    }
    return (
        !isError && (
            <AppLayout>
                <Box maxW={900} mx={"auto"} w={"full"} px={{ base: 2, md: 0 }}>
                    <Box borderBottom={"solid 1px rgba(0,0,0,.07)"} w={"full"} p={8} mt={58} display={"flex"} flexWrap={"wrap"} gap={6}>
                        <ProductMetaData data={data} />
                        <SingleProductMediaViewer media={data.media} thumbnail={data.thumbnail} />
                    </Box>
                    <ProductDetailsSection details={data.details} />
                </Box>
            </AppLayout>
        )
    )
}

export default SingleProduct