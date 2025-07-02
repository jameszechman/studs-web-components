import { Block } from "payload/types";

export const DefinitionList: Block = {
    slug: "definitionList",
    labels: {
        singular: "Definition List",
        plural: "Definition Lists",
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
        },
        {
            name: "items",
            type: "array",
            labels: {
                singular: "Item",
                plural: "Items",
            },
            fields: [
                {
                    name: "term",
                    type: "text",
                    required: true,
                },
                {
                    name: "definition",
                    type: "richText",
                    required: true,
                },
            ],
        },
    ],
};