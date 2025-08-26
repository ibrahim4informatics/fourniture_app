import { Box, Heading, Image, Text } from '@chakra-ui/react'
import wavePicture from "@/assets/images/wave (1).svg";
import type React from 'react';


type Props = {
  title: string,
  picture: string,
  description?: string,
  wave: boolean
}
const HeaderSection: React.FC<Props> = ({ title, picture, description, wave }) => {
  return (
    <Box w={"100%"} pos={"relative"} h={316} objectFit={"cover"} objectPosition={"center"} mt={"56px"}>
      <Image zIndex={1} pos={"absolute"} top={0} left={0} src={picture} w={"full"} h={"full"} />
      <Box zIndex={2} pos={"absolute"} w={"full"} height={"full"} top={0} left={0} bg={"rgba(0,0,0,.35)"} >

      </Box>

      <Box w={"full"} h={"full"} pos={"absolute"} zIndex={4} display={"flex"} top={0} left={0} alignItems={"center"} justifyContent={"center"} flexDirection={"column"} color={"white"} p={4} gap={4}>
        <Heading size={"3xl"}>{title}</Heading>
        {description && <Text fontSize={16} color={"white"} fontWeight={"bold"} textAlign={{ base: "center", md: "left" }}>{description}</Text>}
      </Box>
      {wave &&
        <Image src={wavePicture} w={"100%"} pos={"absolute"} bottom={0} left={0} zIndex={3} />
      }
    </Box>
  )
}

export default HeaderSection