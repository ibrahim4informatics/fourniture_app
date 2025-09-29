import { Box, Button, Field, FormatNumber, Image, Input, InputGroup, NativeSelect, Span, Tabs, Text, Textarea } from "@chakra-ui/react"
import { useFieldArray, useForm, type UseFormReturn } from "react-hook-form";
import {
    FiPackage, FiImage, FiDollarSign,
} from "react-icons/fi";
import z from "zod/v3";
import RichTextEditor from "../ui/RichTextEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import useCategories from "@/hooks/queries/useCategories";
import { IoIosAdd, IoIosTrash } from "react-icons/io";


const productSchema = z.object({
    //General Form Part
    title: z.string().min(5).max(120),
    sku: z.string(),
    slug: z.string().regex(/^[a-z0-9]+(?:_[a-z0-9]+)*$/, {
        message: "slug should match this pattern: word1_word2_(...)_wordN (letters/numbers only)"
    }).optional(),
    short_description: z.string().min(10).max(500),
    description: z.string().min(5).max(5000),
    category_id: z.string().regex(/\d+/),
    product_type: z.enum(["simple", "variant"]),
    product_attributes: z.array(z.object({
        name: z.string().min(2).max(35),
        values: z.string().refine(values => values.trim().split(",").map(value => value.trim()).length > 0, { message: "You need to enter one value at least" })
    })).optional(),

    //Media Form Part
    media: z.custom<FileList>().refine((file) => file && file.length > 0, { message: "No File Selected" }),
    thumbnail: z.custom<FileList>(),

    // Pricing Product
    base_price: z.string().regex(/\d+/, { message: "Price should be digital number" }),
    sale_ammount: z.string().regex(/\d+/, { message: "Sale price should be digital number" }).refine(value => +value >= 0 && +value <= 100, { message: "The sold ammount shoud be between 0 and 100" }),
    aviable_sale_from: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, { message: "invalid date format" }),
    aviable_sale_to: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, { message: "invalid date format" }),


}).superRefine(({ product_type, product_attributes }, ctx) => {
    if (product_type === "variant" && (!product_attributes || product_attributes.length < 1)) {
        ctx.addIssue({
            path: ["product_attributes"],
            code: z.ZodIssueCode.custom,
            message: "Variants are requirered when the product type is variant"
        })
    }
})

type CreateProductFormField = z.infer<typeof productSchema>;



interface BaseTabProps {
    createProductHookForm: UseFormReturn<CreateProductFormField>
}

interface GeneralTabContentProps extends BaseTabProps {

}
interface MediaTabProps extends BaseTabProps { }
interface PricingTabContentProps extends BaseTabProps { }


const GeneralTabContent: React.FC<GeneralTabContentProps> = ({ createProductHookForm: { register, control, watch, formState: { errors, isSubmitting } } }) => {
    const { data: categories, isLoading: isCategoriesLoading, error: categoriesFetchError } = useCategories();
    const { fields, append, remove } = useFieldArray(
        {
            control,
            name: "product_attributes"
        }
    );
    return (
        <Box w={"full"}>
            <Field.Root my={2} invalid={errors.title?.message ? true : false} disabled={isSubmitting} required>
                <Field.Label>Product Name <Field.RequiredIndicator /></Field.Label>
                <Input type="text" {...register("title")} />
            </Field.Root>
            <Field.Root my={2} invalid={errors.title?.message ? true : false} disabled={isSubmitting} >
                <Field.Label>Slug</Field.Label>
                <Input placeholder={watch("title") ? watch("title").trim().toLowerCase().replaceAll(" ", "_") : "Short link name, lowercase with _ (e.g. modern_chair)"} type="text" {...register("slug")} />
            </Field.Root>
            <Field.Root my={2} invalid={errors.title?.message ? true : false} disabled={isSubmitting} required>
                <Field.Label>Short Description <Field.RequiredIndicator /></Field.Label>
                <Textarea  {...register("short_description")} />
            </Field.Root>
            <RichTextEditor control={control} name="description" label="Description" required />
            <Field.Root my={2} required disabled={isSubmitting || isCategoriesLoading} invalid={(categoriesFetchError?.message || errors.category_id?.message) ? true : false}>
                <Field.Label>Category <Field.RequiredIndicator /> </Field.Label>
                <NativeSelect.Root>
                    <NativeSelect.Field {...register("category_id")} placeholder="Select Option">
                        {categories && categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                </NativeSelect.Root>
            </Field.Root>
            <Field.Root my={2} required disabled={isSubmitting} invalid={errors.product_type?.message ? true : false}>
                <Field.Label>Product Type <Field.RequiredIndicator /> </Field.Label>
                <NativeSelect.Root>
                    <NativeSelect.Field {...register("product_type")} placeholder="Select Option">

                        <option value="simple">Simple</option>
                        <option value="variant">Variant</option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                </NativeSelect.Root>

            </Field.Root>

            {
                watch("product_type") && watch("product_type") === "variant" && (
                    <Box w={"full"} mt={3}>

                        <Text fontSize={18} fontWeight={"bold"}>Product Attributes</Text>

                        {
                            fields.map((field, index) => (
                                <Box key={field.id} my={2} rounded={"md"} display={"flex"} alignItems={"center"} gap={2}>
                                    <Field.Root invalid={errors.product_attributes && errors.product_attributes[index]?.name?.message ? true : false} required >
                                        <Input placeholder="Attribute name e.g:colors,sizes..." {...register(`product_attributes.${index}.name`)} />
                                        <Field.ErrorText>

                                            {errors.product_attributes && errors.product_attributes[index]?.name?.message}
                                        </Field.ErrorText>
                                    </Field.Root>


                                    <Field.Root invalid={errors.product_attributes && errors.product_attributes[index]?.values?.message ? true : false} required >
                                        <Input placeholder="Attribute values e.g:red,green..." {...register(`product_attributes.${index}.values`)} />
                                        <Field.ErrorText>

                                            {errors.product_attributes && errors.product_attributes[index]?.values?.message}
                                        </Field.ErrorText>
                                    </Field.Root>

                                    <Button colorPalette={"red"} variant={"subtle"} onClick={() => { remove(index) }}><IoIosTrash /></Button>
                                </Box>
                            ))
                        }

                        <Button my={2} colorPalette={"green"} onClick={() => append({ name: "", values: "" })}><IoIosAdd /> Add Variant</Button>

                    </Box>
                )
            }

        </Box>
    )
}




const MediaTabContent: React.FC<MediaTabProps> = ({ createProductHookForm: { register, watch, formState: { errors } } }) => {


    return (
        <Box w={"full"} px={8} py={4}>
            {/* Thumbnail Upload */}
            <Box mb={4}>

                <Text fontSize={18} fontWeight={"bold"}>Select Thumbnail For Your Product</Text>
                <Text fontSize={14} color={"GrayText"} mb={3}>The Thumbnail is what you see on the product card it sould be attractive!</Text>

                <Box display={"flex"} gap={4} flexDir={"column"} mt={2}>

                    {watch("thumbnail") && <Image src={URL.createObjectURL(watch("thumbnail").item(0)!)} alt="thumnail" w={200} h={200} rounded={"md"} />}
                    <Button pos={"relative"} colorPalette={"green"} w={200}>
                        {watch("thumbnail") ? "Change Thumbnail" : "Upload Thumbnail"}
                        <Input type="file" pos={"absolute"} top={0} left={0} w={"full"} h={"full"} opacity={0} {...register("thumbnail")} />
                    </Button>
                </Box>
            </Box>



            {/* Image Preview */}
            <Box w={"full"} mb={4}>
                <Text fontSize={24} fontWeight={"bold"}>Images To Upload</Text>

                <Box w={"full"} display={"flex"} my={6} alignItems={"center"} gap={3} flexWrap={"wrap"}>
                    {watch("media") && Array.from(watch("media")).map(file => (
                        <Box pos={"relative"} w={"100px"} rounded={"md"} h={"100px"}>
                            <Image pos={"absolute"} top={0} left={0} shadow={"sm"} rounded={"md"} src={URL.createObjectURL(file)} w={"full"} h={"full"} />
                        </Box>
                    ))}
                </Box>

            </Box>
            {/* Product Images Upload */}
            <Box pos={"relative"} border={"dashed 1px rgba(0,0,0,.4)"} p={6} rounded={"md"} display={"flex"} w={"full"} alignItems={"center"} flexDir={"column"} gap={3} justifyContent={"center"}>
                <Text fontSize={18} >Upload Product Photos</Text>
                <Text fontSize={14} color={"GrayText"} >you can drag and drop the files</Text>
                <Input {...register("media")} zIndex={200} opacity={0} type="file" multiple pos={"absolute"} top={0} left={0} h={"full"} />
                {errors.media?.message && <Text my={3} color={"red.600"}>{errors.media?.message}</Text>}
            </Box>
        </Box>
    )
}


const PricingTabContent: React.FC<PricingTabContentProps> = ({ createProductHookForm: { register, formState: { isSubmitting, errors, }, watch } }) => {
    return (


        <Box w={"full"} px={8} py={4}>

            <Text fontSize={18} fontWeight={"bold"}>Product Pricing</Text>

            <Box mt={4} display={"flex"} alignItems={"center"} gap={4}>
                <Field.Root flex={1} required disabled={isSubmitting} invalid={!!errors.base_price?.message} >

                    <Field.Label>Base Price <Field.RequiredIndicator /></Field.Label>
                    <InputGroup startElement="$">
                        <Input type="number" {...register("base_price")} />
                    </InputGroup>
                    <Field.ErrorText>{errors.base_price?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root flex={1} required disabled={isSubmitting} invalid={!!errors.base_price?.message} >

                    <Field.Label>Sale Ammount <Field.RequiredIndicator /></Field.Label>
                    <InputGroup startElement="%">
                        <Input min={0} max={100} type="number" {...register("sale_ammount")} />
                    </InputGroup>
                    <Field.ErrorText>{errors.sale_ammount?.message}</Field.ErrorText>
                </Field.Root>
            </Box>
            {watch("base_price") &&
                <Text fontSize={14} mt={2} color={"GrayText"}>
                    The Sale Price Now is:
                    <Span color={"green.500"} fontWeight={"bold"} ml={2}><FormatNumber value={+watch("base_price") - (+watch("sale_ammount") || 0) * +watch("base_price") / 100} style="currency" currency="USD" /></Span>
                </Text>

            }
            {watch("sale_ammount") && <Box mt={4} display={"flex"} alignItems={"center"} gap={4}>
                <Field.Root flex={1} required disabled={isSubmitting} invalid={!!errors.aviable_sale_from?.message} >
                    <Field.Label>Sold Aviable From <Field.RequiredIndicator /></Field.Label>
                    <Input type="date" {...register("aviable_sale_from")} />
                    <Field.ErrorText>{errors.aviable_sale_from?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root flex={1} required disabled={isSubmitting} invalid={!!errors.aviable_sale_to?.message} >
                    <Field.Label>Sold Aviable To<Field.RequiredIndicator /></Field.Label>
                    <Input type="date" {...register("aviable_sale_to")} />
                    <Field.ErrorText>{errors.aviable_sale_to?.message}</Field.ErrorText>
                </Field.Root>
            </Box>}



        </Box>

    )
}



const CreateProductForm = () => {
    const createProductHookForm = useForm({ resolver: zodResolver(productSchema) });
    // const { register, formState, control, watch } = createProductHookForm;
    const tabs = [
        { name: "General", icon: <FiPackage />, content: <GeneralTabContent createProductHookForm={createProductHookForm} /> },
        { name: "Media", icon: <FiImage />, content: <MediaTabContent createProductHookForm={createProductHookForm} /> },
        { name: "Pricing", icon: <FiDollarSign />, content: <PricingTabContent createProductHookForm={createProductHookForm} /> },
    ];
    return (
        <Tabs.Root variant={"subtle"} lazyMount unmountOnExit defaultValue={"General"} colorPalette={"red"} size={"sm"} my={4}>
            <Tabs.List bg={"white"} borderBottom={"solid 1px"} borderBottomColor={"gray.200"} pos={"sticky"} zIndex={100} top={0}>
                {
                    tabs.map(
                        tab =>
                            <Tabs.Trigger value={tab.name} key={tab.name} color={"red.500"}>
                                {tab.icon}
                                {tab.name}
                            </Tabs.Trigger>
                    )
                }

            </Tabs.List>
            {tabs.map(tab => <Tabs.Content key={tab.name} value={tab.name}>{tab.content}</Tabs.Content>)}


        </Tabs.Root>
    )
}





export default CreateProductForm