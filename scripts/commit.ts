import { readFile } from 'node:fs/promises'
import { execa } from 'execa'
import { checkDiffMessages } from '../src/diff';

(async function iife() {
  const after = await readFile('./assets/cnaps.csv', 'utf-8')
  const { stdout: before } = await execa(`git`, ['--no-pager', 'show', 'HEAD^:./assets/cnaps.csv'] /* { stdout: 'inherit' } */)
  const lines = checkDiffMessages(before, after)
  await execa('git', ['commit', '-m', `feat: update cnaps data\n\n${lines.join('\n')}`])
})()
