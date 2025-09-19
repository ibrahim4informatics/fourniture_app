import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import type { IconType } from 'react-icons/lib'
import { Link, NavLink } from 'react-router-dom'

type Props = {
    text: string,
    icon?: React.ReactNode,
    href: string,
    variant?: "navlink" | "link"
}

const DashboardLink: React.FC<Props> = ({ href, text, icon, variant = "link" }) => {


    return (
        <Box asChild w={"full"} color={"gray.700"} bg={location.pathname === href ?"red.200":"gray.200"} rounded={"md"} px={3} py={4} display={"flex"} alignItems={"center"} justifyContent={{base:"center", lg:"start"}} gap={2}>
          
            {variant === "navlink" ?
                <NavLink to={href}>
                    {icon && icon}

                    <Text display={{base:'none', lg:"block"}}>{text}</Text>
                </NavLink>

                : <Link to={href}>
                    {icon && icon}

                    <Text>{text}</Text>
                </Link>
            }
        </Box>
    )
}

export default DashboardLink