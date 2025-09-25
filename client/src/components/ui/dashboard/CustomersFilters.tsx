import { useAppDispatch } from '@/hooks/stateHooks'
import { customersFilterToggler } from '@/store/slices/dashboardSlice'
import { Box, Button, Field, Input, NativeSelect, Spinner, Text } from '@chakra-ui/react'
import { motion } from 'motion/react'
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import urlParamSetter from '@/utils/urlParamSetter';
import { useSearchParams } from 'react-router-dom'
import useWilayasQuery from '@/hooks/queries/useWilayasQuery'

const CustomersFilters = React.forwardRef((_props, ref) => {
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

                <Button colorPalette={"red"} onClick={() => { dispatch(customersFilterToggler("hide")) }} variant={"subtle"}><IoIosArrowBack /></Button>
                <Text fontWeight={"bold"} fontSize={24}>Filter Users</Text>

            </Box>
            <Box w={"full"} px={2} flex={1} gap={6} display={"flex"} flexDir={"column"} overflowY={"auto"}>

                <Field.Root>
                    <Field.Label>Email</Field.Label>
                    <Input type='email' name='email' value={searchParams.get("email") || ""} onChange={(e) => handleChange(e.target.name, e.target.value)} />
                </Field.Root>


                <Field.Root>
                    <Field.Label>First Name</Field.Label>
                    <Input type='text' name='first_name' value={searchParams.get("first_name") || ""} onChange={(e) => handleChange(e.target.name, e.target.value)} />
                </Field.Root>



                <Field.Root>
                    <Field.Label>Last Name</Field.Label>
                    <Input type='text' name='last_name' value={searchParams.get("last_name") || ""} onChange={(e) => handleChange(e.target.name, e.target.value)} />
                </Field.Root>




                <Field.Root>

                    <Field.Label>Phone Number</Field.Label>
                    <Input type='text' name='phone' value={searchParams.get("phone") || ""} onChange={(e) => handleChange(e.target.name, e.target.value)} placeholder='examlpe:0566489878' maxLength={10} />

                </Field.Root>



                <Field.Root disabled={isLoading} >

                    <Field.Label>Wilaya</Field.Label>

                    {error ? <Text fontSize={18} color={"red.600"} my={2}>{error.message}</Text> : (
                        <NativeSelect.Root>
                            {isLoading ? <Spinner size={"sm"} colorPalette={"gray"} /> : (<>
                                <NativeSelect.Field name='wilaya' value={searchParams.get("wilaya") || ""} onChange={(e) => { handleChange(e.target.name, e.target.value) }}>
                                    <option value="">All</option>
                                    {wilaya && wilaya.map((w: any) => <option key={w.code} value={w.name}>{w.code}-{w.name}</option>)}
                                </NativeSelect.Field>
                                <NativeSelect.Indicator /></>)}
                        </NativeSelect.Root>
                    )}


                </Field.Root>


                <Box display={"flex"} alignItems={"center"} gap={4}>
                    <Button onClick={() => { setSearchParams({}) }} colorPalette={"red"} variant={"subtle"}>Clear All</Button>
                    <Button onClick={() => { console.log("invalidate query to force refetch") }}>Filter</Button>

                </Box>




            </Box>


        </Box>


    )
})

export default motion.create(CustomersFilters);