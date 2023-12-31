export type StringifyJSONConfig = {
    base: string
    key: string
    keySpace: string
    indent: string
    lineBreak: string
    endsWith: string
}
export default function stringifyJSON(construct: any, config?: Partial<StringifyJSONConfig>): string;