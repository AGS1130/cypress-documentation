import fs from "fs"
import path from "path"
import glob from "glob"
import toc from "markdown-toc-unlazy"

const FILE_PATHS = {
  api: "content/api",
  examples: "content/examples",
  faq: "content/faq",
  guides: "content/guides",
  plugins: "content/plugins"
}

export const FILE_PATH = (page: string) => path.join(process.cwd(), FILE_PATHS[page])

export const contentFilePaths = (pagePath: string) => fs
  .readdirSync(pagePath)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path))

export const allContentFilePaths = (page: string) => glob
  .sync(`${FILE_PATHS[page]}/**/*`)
  .filter((path) => /\.mdx?$/.test(path))
  .map((path) => path.replace(/^content/, ""))

export const getToCForMarkdown = (markdown) => {
  const tableOfContents = toc(markdown).json

  tableOfContents.forEach((item, index) => {
    const removeIconAndBackTicks = item.content
      .replace(/^<.*>/g, "")
      .replace(/`/g, "")
    const removeStartingHyphen = item.slug.replace(/^-/, "")
    tableOfContents[index].content = removeIconAndBackTicks
    tableOfContents[index].slug = removeStartingHyphen
  })

  return tableOfContents
}
