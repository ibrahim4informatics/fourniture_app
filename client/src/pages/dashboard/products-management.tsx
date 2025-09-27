import CreateProductForm from "@/components/forms/CreateProductForm"
import ProductsTable from "@/components/ui/dashboard/products/ProductsTable"
import ProductsTopSection from "@/components/ui/dashboard/products/ProductsTopSection"
import Modale from "@/components/ui/Modale"
import useProductsQuery from "@/hooks/queries/useProductsQuery"
import { useAppDispatch, useAppSelector } from "@/hooks/stateHooks"
import DashboardLayout from "@/layouts/DashboardLayout"
import { toggleCreateProductForm } from "@/store/slices/dashboardSlice"
import { Box, Button, Spinner, Text } from "@chakra-ui/react"
import { AnimatePresence } from "motion/react"
import { IoIosClose } from "react-icons/io"
import { useSearchParams } from "react-router-dom"


const ProductsManagement = () => {
    const [searchParams] = useSearchParams();
    const { isLoading: isProductsLoading, data: productsData, error: productsFetchErrors } = useProductsQuery({
        queryKey: ["product", "dashboard", searchParams.toString()],

    }, { page: +(searchParams.get("page") || 1) });


    const showCreateProductForm = useAppSelector(state => state.dahsboard.showCreateProductForm);
    const dispatch = useAppDispatch();
    return (
        <DashboardLayout>

            <Box w={"full"} maxW={1280} mx={"auto"}>
                <ProductsTopSection />
                {isProductsLoading ? <Box p={6} w={"full"} display={"flex"} alignItems={"center"} justifyContent={"center"}><Spinner size={"lg"} color={"red"} /></Box> : productsFetchErrors ? (<Box w={"full"} p={6}><Text color={"red.600"}>{productsFetchErrors.message}</Text></Box>) : <ProductsTable products={productsData.products} length={productsData.total} />}
            </Box>



            <AnimatePresence>
                {showCreateProductForm && (
                    <Modale
                        bg={"white"} w={"full"} maxW={650} px={6} rounded={{ base: "none", md: 8 }}
                        h={{ base: "100dvh", md: "80vh" }} overflowY={"auto"}
                        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}


                    >

                        <Box pt={6}  bg={"white"} zIndex={100} w={"full"} mb={4} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                            <Text fontSize={24} fontWeight={"bold"}>New Product</Text>
                            <Button variant={"subtle"} colorPalette={"red"} onClick={() => { dispatch(toggleCreateProductForm("hide")) }}><IoIosClose /></Button>

                        </Box>
                        <CreateProductForm />
                    </Modale>
                )}
            </AnimatePresence>

        </DashboardLayout>
    )
}

export default ProductsManagement