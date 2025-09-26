import ProductsTable from "@/components/ui/dashboard/products/ProductsTable"
import ProductsTopSection from "@/components/ui/dashboard/products/ProductsTopSection"
import useProductsQuery from "@/hooks/queries/useProductsQuery"
import DashboardLayout from "@/layouts/DashboardLayout"
import { Box } from "@chakra-ui/react"
import { useSearchParams } from "react-router-dom"


const ProductsManagement = () => {
    const [searchParams] = useSearchParams();
    const { isLoading: isProductsLoading, data, error: productsFetchErrors } = useProductsQuery({
        queryKey: ["product", "dashboard", searchParams.toString()]
    });
    return (
        <DashboardLayout>
            <Box w={"full"} maxW={1280} mx={"auto"}>
                <ProductsTopSection />
                {isProductsLoading ? <h1>Loading Products</h1> : productsFetchErrors ? <h1>{productsFetchErrors.message}</h1> : <ProductsTable products={data.products} length={data.total} />}
            </Box>

        </DashboardLayout>
    )
}

export default ProductsManagement