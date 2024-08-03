import fse from 'fs-extra'
import type { GansuDetailCnaps } from './api/cnaps'
import { getCnapsList } from './api/cnaps';

(async function iife() {
  const cnapsList = await getCnapsList()

  fse.writeJSON('assets/cnaps.json', cnapsList, { spaces: 2 })
  fse.writeFile('assets/cnaps.csv', toCsv(cnapsList))
})()

function toCsv(data: GansuDetailCnaps[]) {
  const headerRow = `${Object.keys(data[0]).join(',')}\n`
  const bodyRows = data.map(item => Object.values(item).join(',')).join('\n')

  return headerRow + bodyRows
}
