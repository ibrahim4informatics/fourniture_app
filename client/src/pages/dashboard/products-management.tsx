import ProductsTable from "@/components/ui/dashboard/products/ProductsTable"
import ProductsTopSection from "@/components/ui/dashboard/products/ProductsTopSection"
import useProductsQuery from "@/hooks/queries/useProductsQuery"
import DashboardLayout from "@/layouts/DashboardLayout"
import { Box, Spinner, Text } from "@chakra-ui/react"
import { useSearchParams } from "react-router-dom"


const ProductsManagement = () => {
    const [searchParams] = useSearchParams();
    const { isLoading: isProductsLoading, data: productsData, error: productsFetchErrors } = useProductsQuery({
        queryKey: ["product", "dashboard", searchParams.toString()],
        
    }, { page: +(searchParams.get("page") || 1) });
    return (
        <DashboardLayout>

            <Box w={"full"} maxW={1280} mx={"auto"}>
                <ProductsTopSection />
                {isProductsLoading ? <Box p={6} w={"full"} display={"flex"} alignItems={"center"} justifyContent={"center"}><Spinner size={"lg"} color={"red"} /></Box> : productsFetchErrors ? (<Box w={"full"} p={6}><Text color={"red.600"}>{productsFetchErrors.message}</Text></Box>) : <ProductsTable products={productsData.products} length={productsData.total} />}
            </Box>

        </DashboardLayout>
    )
}

export default ProductsManagement