#!/usr/bin/env node
import { cli } from 'cleye'
import packJson from '../package.json'
import run from './run'

const argv = cli({
  name: 'lint-publish',
  version: packJson.version,
  description: 'lint-publish',
  flags: {
    path: {
      type: String,
      description: 'enter the path of the file',
    },
    output: {
      type: String,
      description: 'outpath of the file',
    },
    filename: {
      type: String,
      description: 'output file name',
    },
  },
})

const { path, output, filename } = argv.flags

if (path)
  run(path, output || process.cwd(), filename || 'output.ts')
