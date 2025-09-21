import { Box, Button, Input, InputGroup, Text } from "@chakra-ui/react";
import type { ChangeEvent } from "react";
import { IoIosSearch, IoIosSettings } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import ShowCustomer from "./ShowCustomer";

const CustomerTopSection = () => {

    const [searchParams, setSearchParams] = useSearchParams();

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

                <Button size={"lg"} onClick={() => { console.log("show filters customer") }} variant={"subtle"}>
                    <IoIosSettings />
                    Filters
                </Button>

            </Box>

            <ShowCustomer />
        </>
    )
}

export default CustomerTopSection;