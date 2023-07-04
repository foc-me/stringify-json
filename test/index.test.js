import fs from "node:fs"
import path from "node:path"
import stringify from "../index"

const testPath = path.resolve(process.cwd(), "./test")
const filePath = path.join(testPath, "/formatted.json")

function writeFile(content) {
    fs.writeFileSync(filePath, content)
}

const contruct = [
    {
        id: 0,
        name: "name",
        array: [
            { id: "0-0", p: "pId" },
            { id: "0-1", p: "pId" },
            { id: "0-2", p: "pId" },
            { id: "0-3", p: "pId" },
            { id: "0-4", p: "pId" }
        ]
    },
    {
        id: 1,
        name: "name",
        array: [
            { id: "1-0", p: "pId" },
            { id: "1-1", p: "pId" },
            { id: "1-2", p: "pId" },
            { id: "1-3", p: "pId" },
            { id: "1-4", p: "pId" }
        ]
    },
    {
        id: 2,
        name: "name",
        array: [
            { id: "2-0", p: "pId" },
            { id: "2-1", p: "pId" },
            { id: "2-2", p: "pId" },
            { id: "2-3", p: "pId" },
            { id: "2-4", p: "pId" }
        ]
    },
    {
        id: 3,
        name: "name",
        array: [
            { id: "3-0", p: "pId" },
            { id: "3-1", p: "pId" },
            { id: "3-2", p: "pId" },
            { id: "3-3", p: "pId" },
            { id: "3-4", p: "pId" }
        ]
    },
    {
        id: 4,
        name: "name",
        array: [
            { id: "4-0", p: "pId" },
            { id: "4-1", p: "pId" },
            { id: "4-2", p: "pId" },
            { id: "4-3", p: "pId" },
            { id: "4-4", p: "pId" }
        ]
    }
]

// const string = "12345"
// const boolean = { node: true }

const result = stringify(contruct)
console.log(result)
writeFile(result)