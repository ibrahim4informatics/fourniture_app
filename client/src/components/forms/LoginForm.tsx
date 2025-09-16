import { Box, Button, Field, Input, InputGroup, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { FaGoogle } from 'react-icons/fa';
import { IoEye, IoEyeOff, IoKeyOutline, IoMailOutline } from 'react-icons/io5';
import { email, z } from "zod";
const schema = z.object({

    email: z.email(),
    password: z.string().min(8, { message: "password is short" })
        .regex(/[A-Z]/, { message: "password must contain at least one upper character" })
        .regex(/[a-z]/, { message: "password must contain at least one lower character " })
        .regex(/[0-9]/, { message: "password must contain at lest one digit number" })
        .regex(/[!@#$%^&*(),.?"';:{}|<>\s]/, { message: "password must contain at lest special character" })
})
type FormFields = z.infer<typeof schema>;
const LoginForm = () => {

    const onSubmit:SubmitHandler<FormFields> = (data)=>{
        console.log(data);
    }

    const [showPassword,setShowPassword] = useState(false);

    const toggleShowPassword = ()=>{
        setShowPassword(prev=>!prev)
    }
    const { register,formState: { errors,isSubmitting }, handleSubmit } = useForm(
        { resolver: zodResolver(schema) }
    );
    return (
        <Box w={"full"} maxW={450} borderTop={"solid 1px rgba(0,0,0,.25)"} pt={8}>

            <Field.Root invalid={ errors.email?.message ? true : false } mb={3} required>
                <Field.Label mb={1}>
                    Email
                    <Field.RequiredIndicator/>
                </Field.Label>
                <InputGroup  startElement={<IoMailOutline/>} >
                
                    <Input colorPalette={"green"} size={"lg"} type='email' {...register("email")} />
                </InputGroup>

                <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>



            <Field.Root invalid={ errors.password?.message ? true : false } mb={3} required>
                <Field.Label mb={1}>
                    Password
                    <Field.RequiredIndicator/>
                </Field.Label>
                <InputGroup  startElement={<IoKeyOutline/>} endElement={<Button variant={"plain"} color={"GrayText"} onClick={toggleShowPassword}>{showPassword ? <IoEyeOff/> : <IoEye/>}</Button>} >
                    <Input colorPalette={"green"} size={"lg"} type={showPassword ? "text" : "password"} {...register("password")} />
                </InputGroup>

                <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>

            <Button onClick={handleSubmit(onSubmit)} colorPalette={"green"} loading={isSubmitting} w={"full"} size={"lg"} mb={3}>Sign In</Button>

            <Button display={"flex"} alignItems={"center"} gap={3} variant={"outline"}  rounded={"md"} size={"lg"} w={"full"} >
                
                <FaGoogle/>
                <Text>Sign In With Google</Text>
                
                </Button>


        </Box>
    )
}

export default LoginForm