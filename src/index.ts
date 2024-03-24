import fse from 'fs-extra'
import { getCnapsList } from './api/cnaps';

(async function iife() {
  const cnapsList = await getCnapsList()

  fse.writeJSON('assets/cnaps.json', cnapsList, { spaces: 2 })
})()
