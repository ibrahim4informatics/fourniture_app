import { Box, Field, Input, NativeSelect, Tabs, Textarea } from "@chakra-ui/react"
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


})

type CreateProductFormField = z.infer<typeof productSchema>;


type GeneralTabContentProps = {

    createProductHookForm: UseFormReturn<CreateProductFormField>

}
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





const CreateProductForm = () => {
    const createProductHookForm = useForm({ resolver: zodResolver(productSchema) });
    // const { register, formState, control, watch } = createProductHookForm;
    const tabs = [
        { name: "General", icon: <FiPackage />, content: <GeneralTabContent createProductHookForm={createProductHookForm} /> },
        { name: "Media", icon: <FiImage />, content: <h1>Comming Soon</h1> },
        { name: "Pricing", icon: <FiDollarSign />, content: <h1>Comming Soon</h1> },
        { name: "Shipping", icon: <FiTruck />, content: <h1>Comming Soon</h1> },
        { name: "Advanced", icon: <FiSettings />, content: <h1>Comming Soon</h1> },
    ];
    return (
        <Tabs.Root variant={"subtle"} lazyMount unmountOnExit defaultValue={"General"}  colorPalette={"red"} size={"sm"} my={4}>
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