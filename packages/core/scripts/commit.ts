import { readFile } from 'node:fs/promises'
import { execa } from 'execa'
import { checkDiffMessages } from './diff';

(async function iife() {
  const after = await readFile('./assets/cnaps.csv', 'utf-8')
  await execa('git', ['add', './assets/*'])
  const { stdout: before } = await execa('git', ['--no-pager', 'show', 'HEAD^:./assets/cnaps.csv'] /* { stdout: 'inherit' } */)
  const lines = checkDiffMessages(before, after)
  await execa('git', ['commit', '-m', `feat: update cnaps data\n\n${lines.join('\n')}`])
})()
