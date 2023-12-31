import { spawnSync } from 'node:child_process'

export default (name: string) => {
  spawnSync('git', ['pull'], {
    stdio: 'inherit',
  })

  spawnSync('git', ['add', '.'], {
    stdio: 'inherit',
  })

  spawnSync('git', ['commit', '-m', `chore: update ${name} publish.config.json`], {
    stdio: 'inherit',
  })

  spawnSync('git', ['push', '-f'], {
    stdio: 'inherit',
  })
}
