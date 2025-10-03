import React from "react";
import { Controller, type Control } from "react-hook-form";
import { Field, Box } from "@chakra-ui/react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import DOMPurify from "dompurify";

type RichTextEditorProps = {
    name: string;
    control: Control<any>;
    label?: string;
    required?: boolean
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({ name, control, label, required = false }) => {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold", "italic", "underline", "strike",
        "list",
    ];

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState:{invalid,error} }) => (
                <Field.Root invalid={!!error} my={2} required={required}>

                    {label && <Field.Label>{label}<Field.RequiredIndicator /></Field.Label>}

                    <Box
                        border="1px solid"
                        w={"full"}
                        borderColor={invalid ? "red.500" : "gray.200"}
                        borderRadius="md"
                        _focusWithin={{ borderColor: "gray.300", boxShadow: "0 0 0 1px rgba(0,0,0,.4)" }}
                    >
                        <ReactQuill
                            theme="snow"
                            value={value || ""}
                            onChange={(html) => {
                                const clean = DOMPurify.sanitize(html, {
                                    ALLOWED_TAGS: [
                                        "b",
                                        "i",
                                        "em",
                                        "strong",
                                        "a",
                                        "p",
                                        "ul",
                                        "ol",
                                        "li",
                                        "br",
                                        "img",
                                        "h1",
                                        "h2",
                                        "h3",
                                        "blockquote",
                                    ],
                                });
                                onChange(clean);
                            }}
                            modules={modules}
                            formats={formats}
                        />
                    </Box>

                    <Field.ErrorText>{error?.message}</Field.ErrorText>

                </Field.Root>
            )}
        />
    );
}


export default RichTextEditor