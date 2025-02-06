import { createPatch } from 'diff'
import { expect, it } from 'vitest'
// @ts-expect-error eslint-disable-next-line ts/ban-ts-comment
import after from './fixtures/after.csv?raw'
// @ts-expect-error eslint-disable-next-line ts/ban-ts-comment
import before from './fixtures/before.csv?raw'

it('expect version diff', async () => {
  const result = createPatch('version.diff', before, after)
  await expect(result).toMatchFileSnapshot('__snapshots__/version.diff')
})
