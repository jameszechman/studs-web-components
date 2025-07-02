import { Block } from "payload/types";
import richText from "../fields/richText";

export const RichText: Block = {
    slug: "richTextBlock",
    fields: [
        richText()
    ]
}