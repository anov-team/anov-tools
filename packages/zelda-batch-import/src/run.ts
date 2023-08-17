import fs from 'node:fs'
import path from 'node:path'
import * as babel from '@babel/core'
import presetEnv from '@babel/preset-env'
import presetTypescript from '@babel/preset-typescript'

export const getJsTsFilesInDirectory = (directoryPath: string, fileList: string[] = []) => {
    const files = fs.readdirSync(directoryPath)

    files.forEach((file) => {
        const filePath = path.join(directoryPath, file)
        const stat = fs.statSync(filePath)

        if (stat.isDirectory())
            getJsTsFilesInDirectory(filePath, fileList)

        else if (['.js', '.ts'].includes(path.extname(filePath)))
            fileList.push(filePath)
    })

    return fileList
}

export const checkExportInFile = (filePath: string) => {
    console.log(filePath, 111)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const res = babel.transformSync(fileContent, {
        filename: filePath,
        presets: [presetEnv, presetTypescript],
        plugins: [],
    })

    return res?.code!.includes('export')
}

const removeFileExtension = (filename: string) => {
    const lastDotIndex = filename.lastIndexOf('.')
    if (lastDotIndex !== -1)
        return filename.substring(0, lastDotIndex)

    return filename
}

const run = (cpath: string, outPath: string, filename: string) => {
    const files = getJsTsFilesInDirectory(cpath)
    const noExportFiles = files.filter(file => checkExportInFile(file))

    const lastOutput = noExportFiles.reduce((prev: string, curr: string) => {
        const lastPath = removeFileExtension(path.relative(path.join(outPath), curr))
        const output = `
        export * from './${lastPath}'
        `
        return `${prev + output}\n`
    }, '')

    // todo handle issave
    fs.writeFileSync(`${outPath}/${filename}`, lastOutput)
}

export default run
