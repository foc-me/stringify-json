# stringify-json

format the json string before write into file  
with indent and linebreak

## usage  

```javascript
const fs = require("node:fs")
const stringify = require("@focme/stringify-json")
const filePath = "/.../test.json"
const json = { ... }
const config = { ... }

fs.writeFileSync(filePath, stringify(json, config))
```

## config  

**config.keySpace**  

every key name has a `:` after it  
and every `:` has a key-space after it  
default to `" "`

```javascript
// with keySpace is " " the file will looks like
{
  "name": "@focme/stringify-json"
}

// with keySpace is ""
{
  "name":"@focme/stringify-json"
}

// with keySpace is " ~ "
{
  "name": ~ "@focme/stringify-json"
}
```

**config.indent**  

the indent at start of the line  
the indent will double after line break  
default is `"  "`

```javascript
// with indent is "   " the file will looks like
{
   "name": "@focme/stringify-json",
   "script": {
      "test": "node ./script/test/index.test.js"
   }
}

// with indent is " "
{
 "name": "@focme/stringify-json",
 "script": {
  "test": "node ./script/test/index.test.js"
 }
}
```

**config.lineBreak**  

every line will have a line break in the end  
except the last line  
default is `"\n"`

```javascript
// with lineBreak is "\n" the file will looks like
{
   "name": "@focme/stringify-json",
   "script": {
       "test": "node ./script/test/index.test.js"
   }
}

// with indent is " "
{ "name": "@focme/stringify-json", "script": { "test": "node ./script/test/index.test.js" } }
```

## have fun  

when set config to `{ indent: "", keySpace: "", lineBreak: "" }`  
the file will be exactly the same with `fs.writeFileSync(JSON.stringify(json))`