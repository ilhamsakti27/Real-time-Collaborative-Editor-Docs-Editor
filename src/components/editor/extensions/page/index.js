/* eslint-disable  */
import { Extension } from "@tiptap/core"
import { Page } from "./page"

export const LinkToPage = Extension.create({
    name: "LinkToPage",

    addExtensions() {
        const extensions = []
        extensions.push(Page)
        return extensions
    }
})

export default LinkToPage
