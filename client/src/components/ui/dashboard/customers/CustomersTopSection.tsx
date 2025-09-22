import { Box, Button, Input, InputGroup, Text } from "@chakra-ui/react";
import { useState, type ChangeEvent } from "react";
import { IoIosSearch, IoIosSettings } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import ShowCustomer from "./ShowCustomer";
import { AnimatePresence } from "motion/react";
import CustomersFilters from "../CustomersFilters";
import { useDispatch } from "react-redux";
import { customersFilterToggler } from "@/store/slices/dashboardSlice";
import { useAppSelector } from "@/hooks/stateHooks";

const CustomerTopSection = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();
    const showCustomersFilters = useAppSelector(state=>state.dahsboard.showCustomerFilters);

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

                <Text fontSize={27}>Customers</Text>
                <InputGroup flex={1} px={6} py={8} startElement={<IoIosSearch size={25} color='#a1a1aa' />} >
                    <Input onChange={handleChange} colorPalette={"red"} variant={"subtle"} placeholder='Search By Name.' value={searchParams.get("search") || ""} size={"lg"} rounded={"full"} />
                </InputGroup>

                <Button size={"lg"} onClick={() => { dispatch(customersFilterToggler("show")) } } variant={"subtle"}>
                    <IoIosSettings />
                    Filters
                </Button>

            </Box>

            <AnimatePresence>
                {showCustomersFilters && <CustomersFilters initial={{ right: "-100%", opacity:0 }} animate={{ right: 0, opacity:1 }} exit={{ right: "-100%", opacity:0 }}  />}
            </AnimatePresence>
        </>
    )
}

export default CustomerTopSection;