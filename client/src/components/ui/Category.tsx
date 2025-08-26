import type { CategoryProps } from '@/types/Caterory'
import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'


const Category: React.FC<CategoryProps> = ({ thumbnail, name, id }) => {
    return (
        <Box asChild cursor={"pointer"} pos={"relative"} _hover={{ opacity: 0.9 }} w={200} h={250} borderRadius={12} >
            <Link to={`/shop?category=${id}`}>

                <Image borderRadius={12} zIndex={1} pos={"absolute"} src={thumbnail} top={0} left={0} w={"full"} h={"full"} objectFit={"cover"} />
                <Box borderRadius={12} display={"flex"} alignItems={"end"} justifyContent={"center"} zIndex={2} pos={"absolute"} top={0} left={0} w={"full"} h={"full"} bg={"rgba(0,0,0,.3)"}>

                    <Text zIndex={3} color={"white"} fontWeight={"bold"} textAlign={"center"} py={4} w={"full"} fontSize={20} bg={"transparent"}>{name}</Text>

                </Box>
            </Link>
        </Box>
    )
}

export default Category