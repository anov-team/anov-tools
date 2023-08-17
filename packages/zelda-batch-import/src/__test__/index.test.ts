import path from 'node:path'
import run, { checkExportInFile, getJsTsFilesInDirectory } from '../run'

describe('zelda-batch-import', () => {
    describe('test getJsTsFilesInDirectory', () => {
        it('base', () => {
            expect(getJsTsFilesInDirectory(path.resolve(__dirname)).length).toBe(1)
        })
    })
    describe('checkExportInFile', () => {
        it('base', () => {
            expect(checkExportInFile(path.resolve(__dirname, '../run.ts'))).toBe(true)
        })
    })

    it('base', () => {
        console.log(path.resolve(__dirname, '../'))
        run(path.resolve(__dirname, '../'), `${process.cwd()}`, 'output.ts')
    })
})
