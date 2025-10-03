import React, { useEffect } from "react";
import { useForm , useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Tabs,
  Button,
  Input,
  Field,
  Textarea,
  Box,
  NativeSelect,
  Text,
  Image,
  Span,
} from "@chakra-ui/react";
import { IoIosAdd, IoIosClose, IoIosSave, IoIosTrash } from "react-icons/io";
import { FiPackage, FiImage, FiDollarSign } from "react-icons/fi";
import RichTextEditor from "../ui/RichTextEditor";
import useCategories from "@/hooks/queries/useCategories";
import { IoCloudUpload } from "react-icons/io5";


const productAttributeSchema = z.object({
  name: z.string().min(3).max(30),
  values: z.string().min(1).regex(/^[a-zA-Z0-9]+(?:,[a-zA-Z0-9]+)*$/, { message: "the values must be seperated with (,)" }).transform(val => val.trim().split(","))
})


const productSchema = z.object({
  // general informations
  title: z.string().min(3).max(150),
  sku: z.string().min(3).max(200).optional(),
  short_description: z.string().min(3).max(500),
  description: z.string().min(20, { message: "The description is too short" }).max(3000, { message: "make the description shorter" }),
  category_id: z.string().regex(/\d+/, { message: "Category is not valid" }).transform(val => parseInt(val)),
  slug: z.string().regex(/^[a-z0-9]+(?:_[a-z0-9]+)*$/, { message: "slug allow only _ and characters" }),
  type: z.enum(["variant", "simple"]),
  attributes: z.array(productAttributeSchema).optional(),

  // media informations
  thumbnail: z.instanceof(FileList).transform(file => file.length > 0 && Array.from(file)[0]).optional(),
  medias: z.instanceof(FileList).optional().transform(files => files && Array.from(files)),
}).superRefine(({ type, attributes, thumbnail, medias }, ctx) => {

  if (type === "variant" && (!attributes || attributes.length < 1)) {
    ctx.addIssue({
      code: "custom",
      path: ["attributes"],
      message: "A variant product should have one attribute at least"
    });
  }

  if (!thumbnail) {
    ctx.addIssue({
      path: ["thumbnail"],
      code: "custom",
      message: "The thumbnail is required"
    })
  }

  if(!medias || medias.length < 1){
    ctx.addIssue({
      path:["medias"],
      code:"custom",
      message:"images of product is required"
    })
  }
})



type ProductFormValues = z.infer<typeof productSchema>;

const CreateProductForm: React.FC = () => {
  const form = useForm({
    resolver: zodResolver(productSchema),
  })

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
    watch,
  } = form;

  const { fields: attributeFields, append: appendAttributeField, remove: removeAttributeField } = useFieldArray({
    control,
    name: "attributes",
  });

  const { data: categories, isLoading: isCategoriesLoading, error: categoriesFetchError } = useCategories();
  // track the field state of important parts i need for ui logic
  const title = watch("title");
  const thumbnail = watch("thumbnail");
  const productType = watch("type");
  const medias = watch("medias");

  // make auto slug generation based on title
  useEffect(() => {
    if (title && title.trim().length > 0) {
      setValue("slug", title.trim().toLowerCase().replaceAll(" ", "_"))
    }
  }, [title])


  useEffect(() => {
    console.log(errors)
  },
    [errors])


  const onSubmit = (data: ProductFormValues) => {
    console.log("Submitted ✅", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Tabs.Root defaultValue="General" variant="enclosed" size="md" my={4}>
        <Tabs.List>
          <Tabs.Trigger value="General">
            <FiPackage /> General
          </Tabs.Trigger>
          <Tabs.Trigger value="Pricing">
            <FiDollarSign /> Pricing
          </Tabs.Trigger>
          <Tabs.Trigger value="Media">
            <FiImage /> Media
          </Tabs.Trigger>
        </Tabs.List>

        {/* General Tab */}
        <Tabs.Content value="General">

          <Field.Root mb={4} required disabled={isSubmitting} invalid={!!errors.title?.message}>
            <Field.Label>Product Name <Field.RequiredIndicator /></Field.Label>
            <Input {...register("title")} />
            <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
          </Field.Root>


          <Field.Root mb={4} disabled={isSubmitting} invalid={!!errors.sku?.message}>
            <Field.Label>Sku</Field.Label>
            <Input {...register("sku")} />
            <Field.ErrorText>{errors.sku?.message}</Field.ErrorText>
            <Field.HelperText>Sku is unique short text to identify product</Field.HelperText>
          </Field.Root>


          <Field.Root required mb={4} disabled={isSubmitting} invalid={!!errors.slug?.message}>
            <Field.Label>Slug <Field.RequiredIndicator /> </Field.Label>
            <Input {...register("slug")} />
            <Field.ErrorText>{errors.slug?.message}</Field.ErrorText>
            <Field.HelperText>Slug is unique text used in url of the website</Field.HelperText>
          </Field.Root>


          <Field.Root required mb={4} disabled={isSubmitting} invalid={!!errors.short_description?.message}>
            <Field.Label>Short Description <Field.RequiredIndicator /> </Field.Label>
            <Textarea {...register("short_description")} />
            <Field.ErrorText>{errors.short_description?.message}</Field.ErrorText>
            <Field.HelperText>The short description should be atrractive</Field.HelperText>
          </Field.Root>
          <RichTextEditor control={control} label="Description" name="description" required />


          <Field.Root required mb={4} disabled={isSubmitting || isCategoriesLoading} invalid={!!errors.category_id?.message}>
            <Field.Label>Category<Field.RequiredIndicator /> </Field.Label>
            {
              !categoriesFetchError && (
                <NativeSelect.Root>
                  <NativeSelect.Field placeholder="Select Option" {...register("category_id")}>

                    {categories && categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}


                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              )
            }
            <Field.ErrorText>{errors.category_id?.message}</Field.ErrorText>
          </Field.Root>





          <Field.Root required mb={4} disabled={isSubmitting || isCategoriesLoading} invalid={!!errors.category_id?.message}>
            <Field.Label>Product Type<Field.RequiredIndicator /> </Field.Label>

            <NativeSelect.Root>
              <NativeSelect.Field placeholder="Select Option" {...register("type")}>

                <option value={"simple"}>Simple</option>
                <option value={"variant"}>Variant</option>


              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>

            <Field.ErrorText>{errors.type?.message}</Field.ErrorText>
          </Field.Root>


          {
            productType === "variant" && (
              <Box w={"full"} my={4}>
                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} w={"full"}>
                  <Text fontWeight={"bold"}>Attributes</Text>
                  <Button colorPalette={"green"} onClick={() => { appendAttributeField({ name: "", values: "" }) }}><IoIosAdd /> Add Attribute</Button>
                </Box>
                {errors.attributes?.root?.message && <Text my={2} fontSize={12} color={"red.600"}>{errors.attributes.root.message}</Text>}
                {attributeFields.map((field, index) => (
                  <Box borderBottom={"solid 1px"} borderBottomColor={"gray.200"} pb={4} key={field.id} w={"full"} display={"flex"} my={4} alignItems={"baseline"} gap={4}>
                    <Field.Root required invalid={errors.attributes && !!(errors.attributes[index]?.name?.message)}>

                      <Field.Label>Name <Field.RequiredIndicator /></Field.Label>
                      <Input {...register(`attributes.${index}.name`)} />
                      <Field.ErrorText>{errors.attributes && errors.attributes[index]?.name?.message}</Field.ErrorText>
                      <Field.HelperText>Here the name of attribute like color,size,...etc</Field.HelperText>

                    </Field.Root>


                    <Field.Root required invalid={errors.attributes && !!(errors.attributes[index]?.values?.message)}>

                      <Field.Label>Values <Field.RequiredIndicator /></Field.Label>
                      <Input {...register(`attributes.${index}.values`)} />
                      <Field.ErrorText>{errors.attributes && errors.attributes[index]?.values?.message}</Field.ErrorText>
                      <Field.HelperText>The attribute values in comma seperated values eg:red,blue,brown,...</Field.HelperText>

                    </Field.Root>

                    <Button colorPalette={"red"} onClick={() => { removeAttributeField(index) }} ><IoIosTrash /></Button>
                  </Box>
                ))
                }

              </Box>
            )
          }



        </Tabs.Content>

        {/* Media Tab */}
        <Tabs.Content value="Media">
          <Text fontSize={22} mb={4} fontWeight={"bold"}>
            Product Media Data
          </Text>

          {/* Thumbnail Upload and Preview section */}
          <Box w={"full"} my={4}>
            <Text fontWeight={"bold"}>Thumbnail<Span color={"red.600"}>*</Span></Text>
            {errors.thumbnail?.message && <Text color={"red.600"} fontSize={14} px={2} textAlign={"center"} my={2}>{errors.thumbnail.message}</Text>}
            <Box pos={"relative"} my={4} rounded={"md"} w={200} h={200} border={thumbnail ? "none" : "dashed 1px"} borderColor={"gray.300"} color={"gray.300"} display={"flex"} alignItems={"center"} justifyContent={"center"} flexDir={"column"}>
              {
                (!thumbnail || thumbnail.length < 1) ?
                  (
                    <>

                      <IoCloudUpload size={40} />
                      <Text px={2} textAlign={"center"} my={2}>Upload thumbnail to see it</Text>
                    </>
                  ) :
                  (
                    <>


                      <Image rounded={"md"} w={"full"} h={"full"} src={URL.createObjectURL(thumbnail.item(0)!)} alt="thumbnail preview" />
                      <Button onClick={() => { setValue("thumbnail", undefined) }} pos={"absolute"} top={0} right={0} colorPalette={"red"} variant={"surface"}><IoIosClose /></Button>

                    </>
                  )
              }
            </Box>
            <Button colorPalette={"green"}>
              {thumbnail ? "Change Thumbnail" : "Choose Thumbnail"}
              <Input type="file" cursor={"pointer"} pos={"absolute"} top={0} left={0} opacity={0} {...register("thumbnail")} />
            </Button>
          </Box>

          {/* Product Gallery Section */}

          <Box w={"full"} my={4}>
            <Text fontWeight={"bold"}>Gallery<Span color={"red.600"}>*</Span></Text>

            {errors.medias?.message && <Text color={"red.600"} fontSize={14} px={2} textAlign={"center"} my={2}>{errors.medias.message}</Text>}

            <Box w={"full"} my={4} display={"flex"} alignItems={"center"} gap={3} flexWrap={"wrap"}>
              {medias && Array.from(medias).map((media, index) => (
                <Box pos={"relative"} w={150} h={150} rounded={"md"} key={index}>
                  <Image  w={"full"} h={"full"} rounded={"md"} src={URL.createObjectURL(media)} />

                  <Button pos={"absolute"} colorPalette={"red"} variant={"surface"} top={0} right={0} onClick={() => {
                    const newMediaArray = Array.from(medias).filter((_media, j) => j !== index);
                    const dataTransfer = new DataTransfer();
                    newMediaArray.forEach(file => dataTransfer.items.add(file));
                    setValue("medias", dataTransfer.files)
                  }}><IoIosClose /></Button>
                </Box>
              ))


              }
            </Box>

            <Box pos={"relative"} w={"full"} p={12} border={"dashed 1px"} borderColor={"gray.300"} color={"gray.400"} my={2} rounded={"md"} display={"flex"} flexDir={"column"} alignItems={"center"} justifyContent={"center"} gap={4}>
              <IoCloudUpload size={60} />
              <Text>Upload different images for the product</Text>
              <Text>You can drag the images inside the box</Text>
              <Input type="file" multiple pos={"absolute"} w={"full"} h={"full"} cursor={"pointer"} opacity={0} {...register("medias")} />
            </Box>


          </Box>
        </Tabs.Content>

        {/* Pricing Tab */}
        <Tabs.Content value="Pricing">
          Pricing
        </Tabs.Content>
      </Tabs.Root>

      <Button my={4} colorPalette={"green"} onClick={handleSubmit(onSubmit)}>
        <IoIosSave /> Create Product
      </Button>
    </form>
  );
};

export default CreateProductForm;
