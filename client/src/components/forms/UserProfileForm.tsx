import type { User } from '@/types/User'
import React from 'react'
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { Box, Button, Field, Input } from '@chakra-ui/react'
type Props = {
    user: User,
    is_active: boolean
}

const schema = z.object({
    first_name: z.string().min(3),
    last_name: z.string().min(3),
    email: z.email(),
    phone: z.string().length(10),
})

const UserProfileForm: React.FC<Props> = ({ user, is_active }) => {

    const { register, formState: { errors, isSubmitting }, handleSubmit ,} = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
        },
    })

    const submitHandler: SubmitHandler<z.infer<typeof schema>> = (data) => {
        console.log(data)
    }

    return (
        <Box>

            <Box w={"full"} display={"flex"} alignItems={"center"} gap={2}>
                <Field.Root mb={2} invalid={errors.first_name?.message ? true : false} required disabled={!is_active}>
                    
                    <Field.Label>First Name<Field.RequiredIndicator /></Field.Label>
                    <Input type='text' {...register("first_name")} />
                    {errors.first_name?.message && <Field.ErrorText>{errors.first_name.message}</Field.ErrorText>}
                </Field.Root>
                <Field.Root mb={2} invalid={errors.last_name?.message ? true : false} required disabled={!is_active}>
                   

                    <Field.Label>Last Name <Field.RequiredIndicator /></Field.Label>
                    <Input type='text' {...register("last_name")} />
                    {errors.last_name?.message && <Field.ErrorText>{errors.last_name.message}</Field.ErrorText>}
                </Field.Root>
            </Box>




            <Field.Root mb={2} invalid={errors.email?.message ? true : false} required disabled={!is_active}>
                <Field.Label>Email Address  <Field.RequiredIndicator /></Field.Label>
                <Input type='email' {...register("email")} />
                {errors.email?.message && <Field.ErrorText>{errors.email.message}</Field.ErrorText>}
            </Field.Root>


             <Field.Root mb={2} invalid={errors.phone?.message ? true : false} required disabled={!is_active}>
                <Field.Label>Phone Number  <Field.RequiredIndicator /></Field.Label>
                <Input type='phone' {...register("phone")} />
                {errors.phone?.message && <Field.ErrorText>{errors.phone.message}</Field.ErrorText>}
            </Field.Root>

            <Button loading={isSubmitting} disabled={!is_active} onClick={handleSubmit(submitHandler)} colorPalette={"green"}>Save</Button>


        </Box>
    )
}

export default UserProfileForm