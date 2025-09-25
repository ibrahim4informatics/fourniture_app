import useWilayasQuery from '@/hooks/queries/useWilayasQuery'
import { useAppDispatch, useAppSelector } from '@/hooks/stateHooks'
import { setEditingCustomerId } from '@/store/slices/dashboardSlice'
import { Box, Button, Field, Input, NativeSelect } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import z from 'zod/v3'



const schema = z.object({
    email: z.string().email(),
    first_name: z.string().min(3).max(35),
    last_name: z.string().min(3).max(35),
    date_of_birth: z.string().regex(/^\d{4}-\d{2}\d{2}$/, { message: "invalid date format" }),
    wilaya: z.string(),
    phone: z.string().length(10).regex(/^(06|07|05)\d{8}$/, { message: "phone number is invalid" }),
    status: z.enum(["active", "banned", "inactive"], { message: "the status is invalid" }),
})


type Fields = z.infer<typeof schema>

const customerExample = {
    id:1,
    email: "ahmed.benali@example.com",
    first_name: "Ahmed",
    last_name: "Benali",
    date_of_birth: "1995-04-12",
    wilaya: "31",
    phone: "0698765432",
    status: "active"
};


const EditCustomerForm = () => {

    const { data: wilayas, error: getWilayasError, isLoading: loadinWilayas } = useWilayasQuery();
    const editingCustomerId = useAppSelector(state => state.dahsboard.editingCustomerId);
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<Fields> = (data) => {
        console.log("Update User ID " + editingCustomerId);
        console.log("With Data")
        console.log(data);
    }



    const { formState: { errors, isSubmitting }, handleSubmit, register } = useForm({ resolver: zodResolver(schema), values: customerExample as Fields })
    return (
        <Box w={"full"}>
            <Field.Root disabled mb={4}>
                <Field.Label>Customer ID</Field.Label>
                <Input value={`${customerExample.id}`} />
            </Field.Root>



            <Field.Root disabled={isSubmitting} mb={4} invalid={errors.first_name?.message ? true : false} required>
                <Field.Label>First Name <Field.RequiredIndicator /></Field.Label>
                <Input type='text' {...register("first_name")} />
            </Field.Root>



            <Field.Root disabled={isSubmitting} mb={4} invalid={errors.last_name?.message ? true : false} required>
                <Field.Label>Last Name <Field.RequiredIndicator /></Field.Label>
                <Input type='text' {...register("last_name")} />
            </Field.Root>


            <Field.Root mb={4} disabled={isSubmitting} invalid={errors.phone?.message ? true : false} required>
                <Field.Label>Phone Number <Field.RequiredIndicator /></Field.Label>
                <Input type='text' {...register("phone")} />
            </Field.Root>


            <Field.Root mb={4} disabled={isSubmitting} invalid={errors.date_of_birth?.message ? true : false} required>
                <Field.Label>Date Of Birth <Field.RequiredIndicator /></Field.Label>
                <Input type='date' {...register("date_of_birth")} />
            </Field.Root>
            <Field.Root mb={4} disabled={isSubmitting || loadinWilayas} invalid={errors.date_of_birth?.message ? true : false} required>
                <Field.Label>Wilaya <Field.RequiredIndicator /></Field.Label>
                <NativeSelect.Root>
                    {(!loadinWilayas && !getWilayasError && wilayas) && (
                        <NativeSelect.Field {...register("wilaya")}>
                            {wilayas.map(wilaya => <option value={wilaya.code}>{wilaya.code}-{wilaya.name}</option>)}
                        </NativeSelect.Field>
                    )}

                    <NativeSelect.Indicator />
                </NativeSelect.Root>
            </Field.Root>


            <Field.Root mb={4} disabled={isSubmitting || loadinWilayas} invalid={errors.date_of_birth?.message ? true : false} required>
                <Field.Label>Status <Field.RequiredIndicator /></Field.Label>
                <NativeSelect.Root>

                    <NativeSelect.Field {...register("status")}>

                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="baned">Baned</option>
                    </NativeSelect.Field>

                    <NativeSelect.Indicator />
                </NativeSelect.Root>
            </Field.Root>

            <Box w={"full"} display={"flex"} alignItems={"center"} gap={4}>

                <Button variant={"subtle"} colorPalette={"red"} onClick={()=> {dispatch(setEditingCustomerId(null))} }>Cancel</Button>
                <Button variant={"solid"} colorPalette={"green"} loading={isSubmitting} onClick={handleSubmit(onSubmit)}>Save</Button>
            </Box>
        </Box>
    )
}

export default EditCustomerForm