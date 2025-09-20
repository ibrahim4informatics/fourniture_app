import { Box, type BoxProps } from '@chakra-ui/react'
import { motion } from 'motion/react'
import React from 'react'

interface Props extends BoxProps {
  children: React.ReactNode
}

const Modale: React.FC<Props> = React.forwardRef(({children, ...props}, ref) => {
  return (
    <Box  bg={"rgba(0,0,0,.8)"} w={"full"} h={"100vh"} position={"fixed"} top={0} left={0} display={"flex"} alignItems={"center"} justifyContent={"center"}>

      <Box  ref={ref} {...props}>
        {children}
      </Box>

    </Box>
  )
})


export const FramerModal = motion.create(Modale);

export default Modale