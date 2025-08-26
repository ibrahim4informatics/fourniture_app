import { Button, Group, Input } from '@chakra-ui/react'
import { forwardRef, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from "motion/react";
const SearchBar = forwardRef<HTMLDivElement>((_props, ref) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleSearch = () => {
        if (pathname.includes("/shop")) {
            const newParams = new URLSearchParams(searchParams);
            if (search.trim()) {
                newParams.set("search", search)
            }

            else {
                newParams.delete("search")
            }
            setSearchParams(newParams);
        }

        else {
            if (search.trim()) {

                navigate(`/shop?search=${search}`)
            }
            else {
                navigate("/shop");
            }
        }
    }
    return (

        <Group ref={ref} zIndex={400} pos={"fixed"} top={60} bg={"white"} p={4} rounded={6}  attached w={"80%"} maxW={650} shadow={"md"} left={"50%"} transform={"translateX(-50%)"}>
            <Input onChange={(e) => setSearch(e.target.value)} placeholder='Search.' value={search} />
            <Button onClick={handleSearch}>
                <IoSearchOutline />
            </Button>

        </Group>
    )
});

export const AnimatedSearchBar = motion.create(SearchBar);
export default SearchBar
