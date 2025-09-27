import { Box, Button, Input, InputGroup, Text } from "@chakra-ui/react";
import { type ChangeEvent } from "react";
import { IoIosAdd, IoIosSearch, IoIosSettings } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { useDispatch } from "react-redux";
import { productFilterToggler, toggleCreateProductForm } from "@/store/slices/dashboardSlice";
import { useAppSelector } from "@/hooks/stateHooks";
import ProductsFilters from "./ProductsFilters";

const ProductsTopSection = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();
    const showProductFilters = useAppSelector(state => state.dahsboard.showProductFilters);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

        const newSearchParams = new URLSearchParams(searchParams);
        const value = e.target.value;
        if (value.trim().length > 0) {
            newSearchParams.set("search", value);
        }
        else {
            newSearchParams.delete("search")
        }
        setSearchParams(newSearchParams)

        // TODO: invalidate query to force refetch
    }
    return (
        <>
            <Box gap={6} w={"full"} py={4} display={"flex"} alignItems={"center"} flexWrap={"wrap"}>

                <Text fontSize={27}>Products</Text>
                <InputGroup flex={1} px={6} py={8} startElement={<IoIosSearch size={25} color='#a1a1aa' />} >
                    <Input onChange={handleChange} colorPalette={"red"} variant={"subtle"} placeholder='Search By Name.' value={searchParams.get("search") || ""} size={"lg"} rounded={"full"} />
                </InputGroup>


                <Button size={"lg"} colorPalette={"red"} onClick={() => { dispatch(toggleCreateProductForm("show")) }} variant={"solid"}>
                    <IoIosAdd />
                    New Product
                </Button>

                <Button size={"lg"} onClick={() => { dispatch(productFilterToggler("show")) }} variant={"subtle"}>
                    <IoIosSettings />
                    Filters
                </Button>

            </Box>

            <AnimatePresence>
                {showProductFilters && <ProductsFilters initial={{ right: "-100%", opacity: 0 }} animate={{ right: 0, opacity: 1 }} exit={{ right: "-100%", opacity: 0 }} />}
            </AnimatePresence>
        </>
    )
}

export default ProductsTopSection;