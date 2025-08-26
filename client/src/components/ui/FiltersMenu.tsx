import { Box, Button, InputGroup, NativeSelect, NumberInput, Text } from '@chakra-ui/react'
import { motion } from 'motion/react'
import React, { forwardRef, useState } from 'react'
import { LuArrowRight } from 'react-icons/lu'
import { useSearchParams } from 'react-router-dom'

type Props = {
    setShowFilterMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const FiltersMenu = forwardRef<HTMLDivElement, Props>(({ setShowFilterMenu }, ref) => {
    const [searchParams, setSearchParams] = useSearchParams();


    const [filters, setFilters] = useState<{ [key: string]: string | number }>({})

    const handleFilter = () => {
        const newSearchParams = new URLSearchParams(searchParams);
        Object.keys(filters).filter(key => filters[key].toString().trim()).map(key => newSearchParams.set(key, filters[key].toString()));
        Object.keys(filters).filter(key => !(filters[key].toString().trim())).map(key => newSearchParams.delete(key));
        setSearchParams(newSearchParams);
    }


    return (
        <Box ref={ref} overflowY={"auto"} pos={"fixed"} top={0} right={0} w={"60%"} maxW={300} bg={"white"} shadow={"sm"} zIndex={400} h={"100vh"} display={"flex"} flexDir={"column"}>

            <Box display={"flex"} alignItems={"center"} gap={4} py={6} px={2}>
                <Button variant={"outline"} colorPalette={"red"} size={"xl"} onClick={() => setShowFilterMenu(false)}>
                    <LuArrowRight />
                </Button>
                <Text fontSize={22} fontWeight={"bold"}>Filters</Text>
            </Box>

            <Box mb={"auto"} w={"full"} display={"flex"} flexDir={"column"} alignItems={"center"} px={2} py={6}>

                <Box w={"full"} my={2}>
                    <Text color={"GrayText"}>Category</Text>

                    <NativeSelect.Root>
                        <NativeSelect.Field value={searchParams.get("category")|| "all"} onChange={(e) => { setFilters(prev => ({ ...prev, category: e.target.value })) }}>
                            <option value="all">All</option>
                            <option value="sofas">Sofas</option>
                            <option value="chairs">Chairs</option>
                            <option value="beds">Beds</option>
                            <option value="tables">Tables</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                </Box>


                <Box w={"full"} my={2}>
                    <Text color={"GrayText"}>Material</Text>

                    <NativeSelect.Root>
                        <NativeSelect.Field value={searchParams.get("material") || "all"} onChange={(e) => { setFilters(prev => ({ ...prev, material: e.target.value })) }}>
                            <option value="all">All</option>
                            <option value="wood">Wood</option>
                            <option value="metal">Metal</option>
                            <option value="glass">Glass</option>
                            <option value="plastic">Plastic</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                </Box>


                <Box w={"full"} my={2}>
                    <Text color={"GrayText"}>Size</Text>

                    <NativeSelect.Root>
                        <NativeSelect.Field value={searchParams.get("size") || "all"} onChange={(e) => { setFilters(prev => ({ ...prev, size: e.target.value })) }}>
                            <option value="sofas">All</option>
                            <option value="xl">Extra Large</option>
                            <option value="l">Large</option>
                            <option value="m">Medium</option>
                            <option value="s">Small</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                </Box>

                <Box w={"full"} my={2}>
                    <Text color={"GrayText"}>Style</Text>

                    <NativeSelect.Root>
                        <NativeSelect.Field value={searchParams.get("style") || "all"} onChange={(e) => { setFilters(prev => ({ ...prev, style: e.target.value })) }}>
                            <option value="all">All</option>
                            <option value="minimalist">Minimalist</option>
                            <option value="modern">Modern</option>
                            <option value="classic">Classic</option>
                            <option value="scandinavian">Scandinavian</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                </Box>
                <Box my={2}>

                    <Text color={"GrayText"}>Price</Text>

                    <Box display={"flex"} w={"full"} alignItems={"center"} gap={2}>
                        <NumberInput.Root size={"lg"} flex={1} >
                            <NumberInput.Control />
                            <InputGroup startElement="$">
                                <NumberInput.Input placeholder='Min.' value={searchParams.get("min_price") ?? ""} onChange={(e) => { setFilters(prev => ({ ...prev, min_price: e.target.value })) }} />
                            </InputGroup>
                        </NumberInput.Root>


                        <NumberInput.Root size={"lg"} flex={1}>
                            <NumberInput.Control />
                            <InputGroup startElement="$">
                                <NumberInput.Input placeholder='Max.' value={searchParams.get("max_price") ?? ""} onChange={(e) => { setFilters(prev => ({ ...prev, max_price: e.target.value })) }} />
                            </InputGroup>
                        </NumberInput.Root>
                    </Box>

                </Box>


                <Box w={"full"} my={2}>
                    <Text color={"GrayText"}>Shipping</Text>

                    <NativeSelect.Root>
                        <NativeSelect.Field value={searchParams.get("shipping") || "all"} onChange={(e) => { setFilters(prev => ({ ...prev, shipping: e.target.value })) }} >
                            <option value="all">All</option>
                            <option value="free">Free</option>
                            <option value="express">Express</option>
                            <option value="regular">Regular</option>
                            <option value="unaviable">Unaviable</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                </Box>
            </Box>


            <Button onClick={handleFilter} colorPalette={"red"} w={"90%"} size={"lg"} mx={"auto"} my={2}>Filter</Button>

        </Box>
    )
})


export const AnimatedFiltersMenu = motion.create(FiltersMenu)
export default FiltersMenu