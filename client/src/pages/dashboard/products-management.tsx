import ProductsTopSection from "@/components/ui/dashboard/products/ProductsTopSection"
import DashboardLayout from "@/layouts/DashboardLayout"
import { Box } from "@chakra-ui/react"


const ProductsManagement = () => {
    return (
        <DashboardLayout>
            <Box w={"full"} maxW={1280} mx={"auto"}>
                 <ProductsTopSection/>    
            </Box>

        </DashboardLayout>
    )
}

export default ProductsManagement