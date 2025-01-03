import { createRequire } from "node:module"
import copy from "rollup-plugin-copy"
import stringify from "./src/index.js"

const require = createRequire(import.meta.url)
const pkg = require("./package.json")

const banner = `/**
 * ${pkg.name} v${pkg.version}
 * @license MIT
 * Copyright (c) 2025 - present Fat Otaku Team
 **/`

const attrs = [
    "name",
    "version",
    "description",
    "keywords",
    ["main", "./index.js"],
    ["module", "./index.esm.js"],
    ["types", "./index.d.ts"],
    ["exports", {
        ".": {
            "types": "./index.d.ts",
            "import": "./index.esm.js",
            "require": "./index.js"
        }
    }],
    ["files", ["index.js", "index.esm.js", "index.d.ts", "package.json", "readme.md"]],
    "author",
    "repository",
    "license"
]

function pickUp(packageInfo) {
    const results = attrs.map(attr => {
        if (typeof attr === "string") {
            return [attr, packageInfo[attr]]
        }
        return attr
    })
    return Object.fromEntries(results)
}

const targets = [
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

export default {
    input: "./src/index.js",
    output: [
        { file: "./dist/index.js", format: "cjs", banner },
        { file: "./dist/index.esm.js", format: "esm", banner }
    ],
    plugins: [
        copy({ targets })
    ]
}