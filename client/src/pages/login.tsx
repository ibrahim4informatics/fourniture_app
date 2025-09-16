import LoginForm from '@/components/forms/LoginForm'
import AppLayout from '@/layouts/AppLayout'
import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

const Login = () => {
    return (
        <AppLayout>
            <Box w={"full"} h={"100vh"} display={"flex"} alignItems={"center"} justifyContent={"center"} flexDir={"column"} gap={6}>

                <Heading size={"3xl"}  fontWeight={"normal"}>Welcome,Sign In & Start Shopping</Heading>
                <LoginForm />

            </Box>
        </AppLayout>
    )
}

export default Login