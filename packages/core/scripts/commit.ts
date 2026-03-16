import { readFile } from 'node:fs/promises'
import { execa } from 'execa'
import fse from 'fs-extra'
import { checkDiffMessages } from './diff';

(async function iife() {
  const after = await readFile('./assets/cnaps.csv', 'utf-8')
  await execa('git', ['add', './assets/*'])
  const { stdout: before } = await execa('git', ['--no-pager', 'show', 'HEAD^:./assets/cnaps.csv'] /* { stdout: 'inherit' } */)
  const lines = checkDiffMessages(before, after)
  fse.writeFileSync('./assets/diff.txt', `feat: update cnaps data\n\n${lines.join('\n')}`, 'utf-8')
  await execa('git', ['commit', '-F', './assets/diff.txt'])
  fse.removeSync('./assets/diff.txt')
})()
