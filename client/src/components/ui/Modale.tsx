import { Box, type BoxProps } from '@chakra-ui/react'
import React from 'react'

interface Props extends BoxProps {
  children: React.ReactNode
}

const Modale: React.FC<Props> = ({
  children, ...props
}) => {
  return (
    <Box bg={"rgba(0,0,0,.8)"} w={"full"} h={"100vh"} position={"fixed"} top={0} left={0} display={"flex"} alignItems={"center"} justifyContent={"center"}>

      <Box  {...props}>
        {children}
      </Box>

    </Box>
  )
}

export default Modale