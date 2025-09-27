import { Box, Field, Image, Input, NativeSelect, Tabs, Text, Textarea } from "@chakra-ui/react"
import { useForm, type UseFormReturn } from "react-hook-form";
import {
    FiPackage, FiImage, FiDollarSign,
    FiTruck, FiSettings
} from "react-icons/fi";
import z from "zod/v3";
import RichTextEditor from "../ui/RichTextEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import useCategories from "@/hooks/queries/useCategories";


const productSchema = z.object({
    title: z.string().min(5).max(120),
    sku: z.string(),
    slug: z.string().regex(/^[a-z0-9]+(?:_[a-z0-9]+)*$/, {
        message: "slug should match this pattern: word1_word2_(...)_wordN (letters/numbers only)"
    }).optional(),
    short_description: z.string().min(10).max(500),
    description: z.string().min(5).max(5000),
    category_id: z.string().regex(/\d+/),
    product_type: z.enum(["simple", "variant"]),
    medias: z.custom<FileList>().refine((file) => file && file.length > 0, { message: "No File Selected" })


})

type CreateProductFormField = z.infer<typeof productSchema>;

interface BaseTabProps {
    createProductHookForm: UseFormReturn<CreateProductFormField>
}

interface GeneralTabContentProps extends BaseTabProps {

}

interface MediaTabProps extends BaseTabProps { }



const GeneralTabContent: React.FC<GeneralTabContentProps> = ({ createProductHookForm: { register, control, watch, formState: { errors, isSubmitting } } }) => {
    const { data: categories, isLoading: isCategoriesLoading, error: categoriesFetchError } = useCategories();
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

        </Box>
    )
}




const MediaTabContent: React.FC<MediaTabProps> = ({ createProductHookForm: { register,watch } }) => {

    
    return (
        <Box w={"full"} px={8} py={4}>


            {/* Image Preview */}


            <Box w={"full"} mb={4}>
                <Text fontSize={24} fontWeight={"bold"}>Images To Upload</Text>

                <Box w={"full"} display={"flex"} my={6} alignItems={"center"} gap={3} flexWrap={"wrap"}>
                    {watch("medias") && Array.from(watch("medias")).map(file => (
                        <Box pos={"relative"} w={"100px"} rounded={"md"} h={"100px"}>
                            <Image pos={"absolute"} top={0} left={0} shadow={"sm"} rounded={"md"} src={URL.createObjectURL(file)} w={"full"} h={"full"} />
                        </Box>
                    ))}
                </Box>

            </Box>

            <Box pos={"relative"} border={"dashed 1px rgba(0,0,0,.4)"} p={6} rounded={"md"} display={"flex"} w={"full"} alignItems={"center"} flexDir={"column"} gap={3} justifyContent={"center"}>
                <Text fontSize={18} >Upload Product Photos</Text>
                <Text fontSize={14} color={"GrayText"} >you can drag and drop the files</Text>
                <Input {...register("medias")} zIndex={200} opacity={0} type="file" multiple pos={"absolute"} top={0} left={0} h={"full"} />
            </Box>
        </Box>
    )
}




const CreateProductForm = () => {
    const createProductHookForm = useForm({ resolver: zodResolver(productSchema) });
    // const { register, formState, control, watch } = createProductHookForm;
    const tabs = [
        { name: "General", icon: <FiPackage />, content: <GeneralTabContent createProductHookForm={createProductHookForm} /> },
        { name: "Media", icon: <FiImage />, content: <MediaTabContent createProductHookForm={createProductHookForm} /> },
        { name: "Pricing", icon: <FiDollarSign />, content: <h1>Comming Soon</h1> },
        { name: "Shipping", icon: <FiTruck />, content: <h1>Comming Soon</h1> },
        { name: "Advanced", icon: <FiSettings />, content: <h1>Comming Soon</h1> },
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