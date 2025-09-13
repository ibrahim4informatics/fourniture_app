import { Box, Button, Field, Input, NativeSelect } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'


const schema = z.object({
    first_name: z.string().min(3),
    last_name: z.string().min(3),
    company_name: z.string().min(5).optional(),
    country: z.string().min(4).max(60),
    street_address: z.string().min(20).max(255),
    city: z.string().min(3).max(155),
    province: z.string().min(3).max(155),
    zip_code: z.string().regex(/^\d{5,9}$/, { message: "Zip code is only numeric values" }),
    phone: z.string().regex(/^0(7|6|5)\d{8}$/, { message: "invalid phone number" }),
    email: z.email(),
    payment: z.enum(["COD", "BDT"])
})


type Props = {
    fields?: z.infer<typeof schema>
}

const CheckoutForm: React.FC<Props> = ({}) => {

    const {  register, formState: { errors, isSubmitting }, watch , handleSubmit} = useForm({
        resolver: zodResolver(schema)
    });


    const onSubmit:SubmitHandler<z.infer<typeof schema >> = (data)=>{
        console.log(data);
    }


    return (
        <Box w={"full"}>

            <Box w={"full"} display={"flex"} alignItems={"center"} mb={4} gap={2}>
                <Field.Root flex={1} invalid={errors.first_name?.message ? true : false} required>
                    <Box>

                        <Field.Label>
                            First Name
                            <Field.RequiredIndicator />
                        </Field.Label>

                        <Input {...register("first_name")} w={"full"} size={"lg"} />
                        <Field.ErrorText>
                            {errors.first_name?.message}
                        </Field.ErrorText>
                    </Box>

                </Field.Root>



                <Field.Root flex={1} invalid={errors.last_name?.message ? true : false} required>
                    <Box>

                        <Field.Label>
                            Last Name
                            <Field.RequiredIndicator />
                        </Field.Label>

                        <Input {...register("last_name")} w={"full"} size={"lg"} />
                        <Field.ErrorText>
                            {errors.last_name?.message}
                        </Field.ErrorText>
                    </Box>

                </Field.Root>
            </Box>


            <Field.Root mb={4} w={"full"} invalid={errors.company_name?.message ? true : false}  >

                <Field.Label>
                    Company Name (Optional)
                </Field.Label>

                <Input  {...register("company_name")} size={"lg"} />
                <Field.ErrorText>
                    {errors.company_name?.message}
                </Field.ErrorText>

            </Field.Root>


            <Field.Root mb={4} w={"full"} invalid={errors.country?.message ? true : false} required>
                <Field.Label>
                    Country
                    <Field.RequiredIndicator />
                </Field.Label>



                <Input size={"lg"} {...register("country")} />

                <Field.ErrorText>
                    {errors.country?.message}
                </Field.ErrorText>
            </Field.Root>


            <Field.Root mb={4} w={"full"} invalid={errors.street_address?.message ? true : false} required>
                <Field.Label>
                    Street Address
                    <Field.RequiredIndicator />
                </Field.Label>



                <Input size={"lg"} {...register("street_address")} />

                <Field.ErrorText>
                    {errors.street_address?.message}
                </Field.ErrorText>
            </Field.Root>
            <Field.Root mb={4} w={"full"} invalid={errors.city?.message ? true : false} required>
                <Field.Label>
                    City
                    <Field.RequiredIndicator />
                </Field.Label>



                <Input size={"lg"} {...register("city")} />

                <Field.ErrorText>
                    {errors.city?.message}
                </Field.ErrorText>
            </Field.Root>



            <Field.Root mb={4} w={"full"} invalid={errors.province?.message ? true : false} required>
                <Field.Label>
                    Province
                    <Field.RequiredIndicator />
                </Field.Label>



                <Input size={"lg"} {...register("province")} />

                <Field.ErrorText>
                    {errors.province?.message}
                </Field.ErrorText>
            </Field.Root>


            <Field.Root mb={4} w={"full"} invalid={errors.zip_code?.message ? true : false} required>
                <Field.Label>
                    zip_code
                    <Field.RequiredIndicator />
                </Field.Label>



                <Input type='number' size={"lg"} {...register("zip_code")} />

                <Field.ErrorText>
                    {errors.zip_code?.message}
                </Field.ErrorText>
            </Field.Root>




            <Field.Root mb={4} w={"full"} invalid={errors.phone?.message ? true : false} required>
                <Field.Label>
                    Phone
                    <Field.RequiredIndicator />
                </Field.Label>



                <Input size={"lg"} {...register("phone")} />

                <Field.ErrorText>
                    {errors.phone?.message}
                </Field.ErrorText>
            </Field.Root>



            <Field.Root mb={4} w={"full"} invalid={errors.email?.message ? true : false} required>
                <Field.Label>
                    Email
                    <Field.RequiredIndicator />
                </Field.Label>



                <Input type='email' size={"lg"} {...register("email")} />

                <Field.ErrorText>
                    {errors.email?.message}
                </Field.ErrorText>
            </Field.Root>


            <Field.Root mb={4} w={"full"} invalid={errors.payment?.message ? true : false} required>
                <Field.Label>
                    Payment Method
                    <Field.RequiredIndicator />
                </Field.Label>



                <NativeSelect.Root size={"lg"}>
                    <NativeSelect.Field placeholder='Select Option' {...register("payment")}>
                        <option value="COD">Cash On Delivery</option>
                        <option value="BDT">Direct Bank Transfer</option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                </NativeSelect.Root>


                {watch("payment") === "BDT" && <Field.HelperText fontWeight={"bold"}  color={"yellow.500"}>Important!!: Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</Field.HelperText>}

                <Field.ErrorText>
                    {errors.payment?.message}
                </Field.ErrorText>
            </Field.Root>


            <Button loading={isSubmitting} w={"full"} onClick={ handleSubmit(onSubmit) } colorPalette={"green"} size={"lg"}>Place Order</Button>



        </Box>
    )
}

export default CheckoutForm