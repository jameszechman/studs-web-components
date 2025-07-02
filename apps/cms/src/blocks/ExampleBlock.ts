import { Block } from "payload/types";
import richText from "../fields/richText";

export const ExampleBlock: Block = {
    slug: "exampleBlock",
    fields: [
        {
            name: "title",
            type: "text",
            required: true
        },
        {
            name: "color",
            type: "select",
            options: [
                { label: "Text", value: "text" },
                { label: "Muted", value: "muted" },
                { label: "Success", value: "success" },
                { label: "Warning", value: "warning" },
                { label: "Danger", value: "danger" },
                { label: "Info", value: "info" },
                { label: "Primary", value: "primary" },
            ],
            defaultValue: "text",
        },
        richText(),
    ]
};