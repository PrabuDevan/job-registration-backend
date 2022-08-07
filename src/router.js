import express from 'express'
import { existsSync, readdirSync } from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const kebabCaseToCamelCase = s => s.replace(/-./g, x => x[1].toUpperCase())

// get current directry path
const __dirname = dirname(fileURLToPath(import.meta.url))

// get all folder names in the given path as array
const getDirectories = path =>
    readdirSync(path, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

/*
With this code the below commented code is automated
We don't have to manually import every new components

import test from './components/test/testUrls.js'
import bigName from './components/big-name/bigNameUrls.js'

app.use('/big-name', bigName)
app.use('/test', test)
*/
export default () => {
    const app = express()
    getDirectories(`${__dirname}/components`).forEach(async name => {
        // dynamically importing the default export
        const routePath = `${__dirname}/components/${name}/${kebabCaseToCamelCase(name)}Urls.js`

        // check if the file exists
        if (existsSync(routePath)) {
            const { default: route } = await import(routePath)
            app.use(`/${name}`, route)
        }
    })
    return app
}