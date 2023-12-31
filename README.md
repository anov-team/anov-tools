# zelda

## What

some npm packages used to improve efficiency

## packages

### zelda-en-lint

#### What

用于检查本次代码工作区 i18n 的英文配置文件是否存在未完成翻译的字段

#### Use

> 注意：path 参数是相对于根项目的相对地址而不是某个文件 eg: -p="./src/i18n/en.json"

- pnpm add zelda-en-lint -D
- pnpm lint-en -p="xxx" xxx: 英文配置文件的路径，默认仅检查暂存区和版本区的 diff
- pnpm lint-en -p="xxx" -a 检查整个英文配置文件,全部不限 git 工作区

#### Example

您可以在 git pre-commit hook 中使用 lint-en 来检查您的代码是否存在未完成翻译的字段

pre-commit

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

other lint && pnpm lint-en -p="xxx"
```

### zelda-publish-lint 「wip」

由于 cicd 中，我们一般会直接配置`npm run build`,`npm publish` 但是很多时候我们的代码并没有版本改动，这样会导致无效的发包，所以我们需要一个工具来校验此次操作是否需要真正发包，避免 cicd 行为中的无效发包导致的错误提醒

#### Use

- pnpm add lint-and-publish
- npx lint-and-publish --init
- 将用`lint-publish`替换掉`npm publish`

### zelda-batch-import 「wip」

文件夹批量导入工具

MIT
