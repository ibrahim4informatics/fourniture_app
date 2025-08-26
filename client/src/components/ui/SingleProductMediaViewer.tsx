import { Box, Image } from '@chakra-ui/react'
import React, { useState } from 'react'


type Props = {
    media: { [key: string]: string }[],
    thumbnail: string
}
const SingleProductMediaViewer: React.FC<Props> = ({ media, thumbnail }) => {
    const [mainImage, setMainImage] = useState(thumbnail);
    return (
        <Box display={"flex"} flexDir={{ base: "column-reverse", md: "row" }} gap={2} w={{ base: "full", md: "auto" }}>

            <Box display={{ base: "flex", md: "block" }} alignItems={"center"} gap={2} flexWrap={"wrap"}>
                {media.map((media: any) => <Image border={media.link === mainImage ? "solid 2px #e04141" : "none"} cursor={"pointer"} key={media.order} src={media.link} w={"76px"} h={"80px"} rounded={"md"} mb={2} onClick={() => { setMainImage(media.link) }} />)}
            </Box>

            <Image src={mainImage} flex={1} w={{ base: "full", md: 306 }} h={346} rounded={"md"} />
        </Box>
    )
}

export default SingleProductMediaViewer