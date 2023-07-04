import copy from "rollup-plugin-copy"
import stringify from "./src/index.js"

const attrs = [
    "name",
    "version",
    "description",
    "keywords",
    ["main", "index.js"],
    ["module", "index.esm.js"],
    ["types", "index.d.ts"],
    ["files", ["index.js", "index.esm.js", "index.d.ts", "package.json", "readme.md"]],
    "author",
    "repository",
    "license"
]
function pickUp(packageInfo) {
    const results = attrs.map(attr => {
        if (typeof attr === "string") return [attr, packageInfo[attr]]
        return attr
    })
    return Object.fromEntries(results)
}

export default {
    input: "./src/index.js",
    output: [
        { file: "./dist/index.js", format: "cjs" },
        { file: "./dist/index.esm.js", format: "es" }
    ],
    plugins: [copy({
        targets: [
            { src: ["./index.d.ts", "./readme.md"], dest: "./dist" },
            {
                src: "./package.json",
                dest: "./dist",
                transform: (content) => {
                    const json = pickUp(JSON.parse(content))
                    return stringify(json)
                }
            }
        ]
    })]
}