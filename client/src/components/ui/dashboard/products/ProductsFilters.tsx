import { useAppDispatch } from '@/hooks/stateHooks'
import { productFilterToggler } from '@/store/slices/dashboardSlice'
import { Box, Button, Field, Input, InputGroup, NativeSelect, Spinner, Text } from '@chakra-ui/react'
import { motion } from 'motion/react'
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import urlParamSetter from '@/utils/urlParamSetter';
import { useSearchParams } from 'react-router-dom'
import useWilayasQuery from '@/hooks/queries/useWilayasQuery'

const furnitureCategories = [
  { id: 1, name: "Sofas & Couches" },
  { id: 2, name: "Beds & Mattresses" },
  { id: 3, name: "Dining Tables" },
  { id: 4, name: "Chairs & Stools" },
  { id: 5, name: "Wardrobes" },
  { id: 6, name: "Coffee Tables" },
  { id: 7, name: "Desks & Office Furniture" },
  { id: 8, name: "TV Stands & Media Units" },
  { id: 9, name: "Bookshelves" },
  { id: 10, name: "Outdoor Furniture" },
  { id: 11, name: "Cabinets & Storage" },
  { id: 12, name: "Dressing Tables" },
  { id: 13, name: "Nightstands" },
  { id: 14, name: "Recliners" },
  { id: 15, name: "Benches" }
];

const ProductsFilters = React.forwardRef((_props, ref) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    const { isLoading, data: wilaya, error } = useWilayasQuery();


    const handleChange = (name: string, value: string) => {
        const newSearchParams = urlParamSetter(searchParams, name, value);
        setSearchParams(newSearchParams);
    }

    return (

        <Box px={4} maxW={450} zIndex={400} bg={"white"} h={"100vh"} shadow={"md"} pos={"fixed"} top={0} right={0} ref={ref} w={"full"} py={6} display={"flex"} flexDirection={"column"} gap={14}>

            <Box w={"full"} display={"flex"} alignItems={"center"} gap={3}>

                <Button colorPalette={"red"} onClick={() => { dispatch(productFilterToggler("hide")) }} variant={"subtle"}><IoIosArrowBack /></Button>
                <Text fontWeight={"bold"} fontSize={24}>Filter Products</Text>

            </Box>
            <Box w={"full"} px={2} flex={1} gap={6} display={"flex"} flexDir={"column"} overflowY={"auto"}>

                <Field.Root>
                    <Field.Label>SKU</Field.Label>
                    <Input type='text' name='sku' value={searchParams.get("sku") || ""} onChange={(e) => handleChange(e.target.name, e.target.value)} />
                </Field.Root>


                <Field.Root>
                    <Field.Label>Stock Status</Field.Label>
                    <NativeSelect.Root>
                        <NativeSelect.Field name='stock' value={searchParams.get("stock") || ""} onChange={(e) => handleChange(e.target.name, e.target.value)}>
                            <option value="">All</option>
                            <option value="in_stock">In Stock</option>
                            <option value="low_stock">Low Stock</option>
                            <option value="out_of_stock">Out Of Stock</option>
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                </Field.Root>



                <Field.Root>
                    <Field.Label>Category</Field.Label>
                    <NativeSelect.Root>
                        <NativeSelect.Field name='category' value={searchParams.get("category") || ""} onChange={(e) => handleChange(e.target.name, e.target.value)}>
                            <option value="">All</option>
                            {furnitureCategories.map(cat => <option value={cat.id} key={cat.id}>{cat.name}</option>)}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                </Field.Root>
                <Field.Root>

                    <Field.Label>Price</Field.Label>
                    
                    <Box w={"full"} display={"flex"} alignItems={"center"} gap={3}>

                        <InputGroup startAddon={"$"} flex={1}>
                            <Input type='number' placeholder='min' onChange={(e) => handleChange(e.target.name, e.target.value)} name='min_price' />
                        </InputGroup>



                        <InputGroup startAddon={"$"} flex={1}>
                            <Input type='number' placeholder='max' name='max_price' onChange={(e) => handleChange(e.target.name, e.target.value)} />
                        </InputGroup>

                    </Box>
                </Field.Root>



                <Field.Root disabled={isLoading} >

                    <Field.Label>Created At</Field.Label>

                    <Input name='created_at' type='date' onChange={(e) => handleChange(e.target.name, e.target.value)}  />

                   


                </Field.Root>


                <Box display={"flex"} alignItems={"center"} gap={4}>
                    <Button onClick={() => { setSearchParams({}) }} colorPalette={"red"} variant={"subtle"}>Clear All</Button>
                    <Button onClick={() => { console.log("invalidate query to force refetch") }}>Filter</Button>

                </Box>




            </Box>


        </Box>


    )
})

export default motion.create(ProductsFilters);