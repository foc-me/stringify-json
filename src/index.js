"use strict"

const defaultConfig = {
    base: "",
    key: "",
    keySpace: " ",
    indent: "  ",
    lineBreak: "\n",
    endsWith: ""
}

function join(...args) {
    return args.join("")
}

function quote(value) {
    if (typeof value !== "string") return value
    return `"${value.replace(/\"/g, "\\\"")}"`
}

function stringify(construct, config) {
    const current = Object.assign({}, defaultConfig, config)
    const { base, key, keySpace, indent, lineBreak, endsWith } = current
    const nextBase = `${base}${indent}`
    const currentKey = key ? `${quote(key)}:${keySpace}` : ""
    const result = []

    if (Array.isArray(construct)) {
        result.push(join(base, currentKey, "["))

        for (let i = 0; i < construct.length; i++) {
            const item = construct[i]
            const last = i === construct.length - 1

            result.push(stringify(item, {
                base: nextBase,
                key: "",
                indent,
                lineBreak,
                endsWith: last ? "" : ","
            }))
        }

        result.push(join(base, "]", endsWith))
    } else if (typeof construct === "object") {
        result.push(join(base, currentKey, "{"))

        const entries = Object.entries(construct)
        for (let i = 0; i < entries.length; i++) {
            const [name, value] = entries[i]
            const last = i === entries.length - 1

            if (typeof value === "object") {
                result.push(stringify(value, {
                    base: nextBase,
                    key: name,
                    keySpace,
                    indent,
                    lineBreak,
                    endsWith: last ? "" : ","
                }))
            } else {
                result.push(join(nextBase, quote(name), ":", keySpace, quote(value, quote), last ? "" : ","))
            }

        }

        result.push(join(base, "}", endsWith))
    }
    else {
        result.push(join(base, quote(construct), endsWith))
    }

    return result.join(lineBreak)
}

export default stringify